'use strict';
angular.module('tink.skeleton', [])
  .directive('tinkSkeleton', [function () {
    return {
      restrict: 'EA',
      scope: {
        text: '@'
      },
      template: '<h1 class="h3 text-center">{{text}}</h1>',
      replace: true,

      link: function(scope) {

        // Do this on load
        function initialize() {
          console.log(scope.text);
        }

        initialize();
      }
    };
  }]);
