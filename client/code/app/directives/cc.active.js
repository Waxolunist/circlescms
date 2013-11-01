angular.module('cc.active', [])
  .value('base', '')
  .directive('ccActive', ['$location', 'base', function (location, base) {
    /*
     * Adds the class in the ccActive directive given to 
     * the element matching the resource given in its href or the first href.
     */
    return {
      restrict: 'A',
      priority: -1,
      link: function postLink($scope, $element, $attrs) {
        var elementPath = $attrs.href || $element.find('[href]').first().attr('href');
        var basePath = base || '';
        $scope.$location = location;
        $scope.$watch('$location.path()', function (newValue, oldValue) {
          if ((basePath + newValue).substring(0, elementPath.length) === (elementPath) &&
              !(newValue === '/' || newValue === basePath)) {
            $element.addClass($attrs.ccActive);
          } else {
            $element.removeClass($attrs.ccActive);
          }
        });
      }
    };
  }]);
