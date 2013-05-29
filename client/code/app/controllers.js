angular.module('circlescms', ['ssAngular'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/*resource', {
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
  .controller('CCCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'rpc', 'CCCache',
    function ($scope, $rootScope, $location, $routeParams, $rpc, $cache) {

      function setTemplate(scope, templates) {
        var tmplIds = $('script[type="text/ng-template"]').map(function (idx, tmpl) {
          return this.id;
        }).get(),
          greppedArray = $.grep(templates, function (val, idx) {
            return $.inArray(val + '.html', tmplIds) > -1;
          });
        scope.templateUrl = greppedArray[0] + '.html';
      }

      function loadContent(scope, location, routeParams, rpc, cache) {
        var path = location.path(),
          cached = cache.get(path);

        scope.isActive = !!routeParams.resource;
        if (angular.isUndefined(cached)) {
          scope.r = rpc('cms.loadcontent', path);
          scope.r.then(
            function success(result) {
              setTemplate(scope, result.templates);
              //store result in cache
              console.log('Result of ' + path + ' in cache.');
              cache.put(path, result);
            },
            function error() {}
          );
        } else {
          console.log('Hit cache for ' + path + '.');
          scope.r = cached;
          setTemplate(scope, cached.templates);
        }
      }

      window.ss.server.on('ready', function () {
        loadContent($scope, $location, $routeParams, $rpc, $cache);
      });
      $scope.$on('$routeChangeSuccess', function (angularEvent, current, previous) {
        if (angular.isUndefined(previous)
            || current.pathParams.resource !== previous.pathParams.resource) {
          loadContent($scope, $location, $routeParams, $rpc, $cache);
        }
      });
    }])
  .directive('ccActive', ['$location', function (location) {
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink($scope, $element, $attrs) {
        var elementPath = $attrs.href;
        $scope.$location = location;
        $scope.$watch('$location.path()', function (newValue, oldValue) {
          if (newValue.substring(0, elementPath.length) === elementPath && newValue !== '/') {
            $element.addClass($attrs.ccActive);
          } else {
            $element.removeClass($attrs.ccActive);
          }
        });
      }
    };
  }]);
