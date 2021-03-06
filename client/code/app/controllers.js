require('/cc.active.js');

var extractLabels = function (input, property, delim) {
  if (!angular.isUndefined(input) && !angular.isUndefined(property)) {
    var retVal = {};
    delim = delim || ' ';
    input.map(function (n) {
      return n[property];
    }).reduce(function (previousValue, currentValue, index, array) {
      return previousValue + delim + currentValue;
    }).split(delim).forEach(function (val, idx, arr) {
      this[val] = (this[val] || 0) + 1;
    }, retVal);
    return retVal;
  }
  return undefined;
};

var toArray = function (input) {
  return _.map(input, function (v, k) {
    return {'key': k, 'value': v};
  });
};

angular.module('circlescms', ['ssAngular', 'cc.active'])
  .value('base', '/cc')
  .config(['$routeProvider', '$locationProvider',
          function ($routeProvider, $locationProvider) {
      $routeProvider.
        when('/*resource', {
          controller: 'CCCtrl',
          template: '<div ng-include="templateUrl">Loading...</div>'
        })
        .when('/', {
          controller: 'CCCtrl',
          template: '<div ng-include="templateUrl">Loading...</div>'
        });
      $locationProvider.html5Mode(true);
    }])
  .factory('CCCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('CCCache', {
      capacity: 20
    });
  }])
  .filter('split', [function () {
    return function (input, delim) {
      if (!angular.isUndefined(input)) {
        delim = delim || ' ';
        return input.split(delim);
      }
      return undefined;
    };
  }])
  .filter('extractLabels', [function () {
    /*
     * This filter extracts a property from an objectlist.
     */
    return extractLabels;
  }])
  .filter('toArray', [function () {
    return toArray;
  }])
  .filter('containsLabel', [function () {
    return function (input, property, label, delim) {
      if (!_.isUndefined(input) && !_.isUndefined(property)) {
        if (_.isEmpty(label) || label === '_') {
          return input;
        }
        var retVal = [];
        delim = delim || ' ';
        input.map(function (n) {
          return n[property].split(delim);
        }).forEach(function (val, idx, arr) {
          if (val.indexOf(label) > -1) {
            retVal.push(input[idx]);
          }
        });
        return retVal;
      }
      return undefined;
    };
  }])
  .filter('markdown', [function () {
    return function (input) {
      if (!_.isUndefined(input)) {
        var marked = window.marked || require('/marked');
        return marked(input);
      }
      return undefined;
    };
  }])
  .controller('CCCtrl', ['$scope', '$rootScope', '$location', '$routeParams', '$compile',
                         'rpc', 'CCCache',
    function ($scope, $rootScope, $location, $routeParams, $compile, $rpc, $cache) {

      function setTemplate(scope, templates) {
        var tmplIds = $('script[type="text/ng-template"]').map(function (idx, tmpl) {
          return this.id;
        }).get(),
          greppedArray = $.grep(templates, function (val, idx) {
            return $.inArray(val.replace(/\//gi, '.') + '.html', tmplIds) > -1;
          });
        scope.templateUrl = greppedArray[0].replace(/\//gi, '.') + '.html';
      }

      function loadContent(scope, location, routeParams, compile, rpc, cache) {
        var path = '/' + routeParams.resource,
          cached = cache.get(path);

        //Set value isActive to true depending on if a resource is loaded
        scope.isActive = !!routeParams.resource;
        if (angular.isUndefined(cached)) {
          scope.r = rpc('cms.loadcontent', path);
          scope.r.then(
            function success(result) {
              setTemplate(scope, result.templates);
              //store result in cache
              console.log('Result of ' + path + ' in cache.');
              cache.put(path, result);
              scope.isLoading = false;
              scope.contentCompiled = compile(result.content)(scope);
              scope.resp = result;
            },
            function error() {}
          );
        } else {
          console.log('Hit cache for ' + path + '.');
          scope.r = cached;
          scope.resp = cached;
          setTemplate(scope, cached.templates);
          scope.isLoading = false;
          scope.contentCompiled = compile(cached.content)(scope);
        }

        scope.location = location;
      }

      if (window.ss.server.listeners('ready').length <= 2) {
        window.ss.server.on('ready', function () {
          loadContent($scope, $location, $routeParams, $compile, $rpc, $cache);
        });
      }
      $scope.$on('$routeChangeSuccess', function (angularEvent, current, previous) {
        if (angular.isUndefined(previous) || current.pathParams.resource !== previous.pathParams.resource) {
          $scope.isLoading = true;
          loadContent($scope, $location, $routeParams, $compile, $rpc, $cache);
        }
      });
    }])
  .directive('ccPreventdefault', [function () {
    return function (scope, element, attrs) {
      $(element).click(function (event) {
        event.preventDefault();
      });
    };
  }])
  .directive('ccHighlightcode', [function () {
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink($scope, $element, $attrs) {
        $scope.$watch('r.content', function (value) {
          var val = value || null;
          if (val) {
            $('pre code').each(function (i, e) {
              var element = $(e),
                classList = element.attr('class');
              if (_.isString(classList)) {
                classList = classList.split(/\s+/);
                classList = classList.map(function (c) {
                  return c.replace(/^lang-/, 'language-');
                });
                if (classList.length > 0) {
                  element.attr('class', classList.join(' ').trim());
                }
              }
              Prism.highlightElement(e, false);
            });
          }
        });
      }
    };
  }])
  .directive('ccSlider', [function () {
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink($scope, $element, $attrs) {
        var paginationel = $element.find('.swiper-pagination')[0],
          swiper = $element.swiper({
            calculateHeight: true,
            autoplay: 5000,
            pagination: paginationel,
            paginationClickable: true,
            resizeReInit: true,
            updateOnImagesReady: true,
            momentumBounce: false,
            slidesPerView: 1,
            loop: true,
            onInit: function() {
              var slides = $element.find('.swiper-slide');
              slides.height('auto');
            }
          });
        $(paginationel.children[0]).addClass('swiper-pagination-switch swiper-visible-switch');
      }
    };
  }])
  .directive('ccBuildlabellist', [function () {
    return {
      scope: {
        ccItems: '=',
        ccLocation: '='
      },
      restrict: 'E',
      controller: ['$scope', function ($scope) {
        $scope.labellist = toArray(extractLabels($scope.ccItems, 'tags'));
      }]
    };
  }]);

