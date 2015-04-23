'use strict';
angular.module('tink.skeleton', [])
  .directive('tinkSkeleton', [function () {
    return {
      restrict: 'EA',
      scope: {
        offset: '@'
      },
      template: '',
      replace: true,

      link: function(scope, element) {

        jQuery(document).ready(function($) {

          // Do this on load
          function initialize() {
          }

          initialize();
        });
      }
    };
  }]);
