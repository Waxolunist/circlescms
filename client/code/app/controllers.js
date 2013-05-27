
angular.module('circlescms', ['ssAngular'])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.
      when('/*resource', {
        controller: 'CCCtrl',
        template: '<div ng-include="templateUrl">Loading...</div>'
      });
    $locationProvider.html5Mode(true);
  }])
  .controller('CCCtrl', ['$scope', '$rootScope', '$location', '$routeParams', 'rpc',
    function ($scope, $rootScope, $location, $routeParams, $rpc) {

      function loadContent(scope, location, routeParams, rpc) {
        var path = location.path();
        scope.isActive = !!routeParams.resource;
        scope.r = rpc('cms.loadcontent', path);
        scope.r.then(
          function success(result) {
            var tmplIds = $('script[type="text/ng-template"]').map(function (idx, tmpl) {
              return this.id;
            }).get();
            var greppedArray = $.grep(result.templates, function (val, idx) {
              return $.inArray(val + '.html', tmplIds) > -1;
            });
            scope.templateUrl = greppedArray[0] + '.html';
          },
          function error() {}
        );
      }

      window.ss.server.on('ready', function () {
        loadContent($scope, $location, $routeParams, $rpc);
      });
      $scope.$on('$routeChangeSuccess', function () {
        loadContent($scope, $location, $routeParams, $rpc);
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
