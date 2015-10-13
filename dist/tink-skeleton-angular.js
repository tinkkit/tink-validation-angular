'use strict';
(function(module) {
  try {
    module = angular.module('tink.validation');
  } catch (e) {
    module = angular.module('tink.validation', []);
  }
  module.directive('tinkValidation', ['$compile',function ($compile) {
    return {
      restrict: 'E',
      scope: {
        label: '@',
        information:'@',
        errors:'='
      },
      templateUrl:'templates/transclude.html',
      transclude: true,
      replace: true,
      require:'^form',
      compile: function(){

      },
      compile: function compile(tElement, tAttrs, transclude) {
          var errors;

          return function preLink(scope, iElement, iAttrs, controller) {
            //give controller to scope.
            scope.form = controller;
            //form string name
            var formName = controller.$name;
            //access name of the element with form
            var elementAccess;

            //Get de ng transclusion information
            transclude(scope, function (clone, scope) {
              //the element that needs to be validated
              var validationElement = clone.filter('[ng-model]');
              // set the name with the form attribute
              elementAccess = formName+'.'+validationElement.attr('name');
              //add de ngmodel option only update on blur
              $(validationElement).attr('ng-model-options','{ updateOn: \'blur\' }');
              //add the ng-class to add the proper css
              iElement.attr('data-ng-class',"{'has-error':("+elementAccess+".$dirty|| "+formName+".submitted) && "+elementAccess+".$invalid && !"+elementAccess+".$focused ,'has-success':("+elementAccess+".$dirty|| "+formName+".submitted) && "+elementAccess+".$valid && !"+elementAccess+".$focused }");
              //get the errors
              errors = clone.filter('errors');
              //replace with the new input
              iElement.find('[ng-model]').replaceWith(validationElement);
            });
            //remove the ng transclude to build the new element
            iElement.find('[ng-transclude]').removeAttr('ng-transclude');
            //add the proper elements
            iElement.find('.errors_show').attr('data-ng-show',"("+elementAccess+".$dirty|| "+formName+".submitted) && "+elementAccess+".$invalid && !"+elementAccess+".$focused");
            //add the error handeling
            iElement.find('.errors_show').append(errors.children().clone());
            //remove the errors element
            iElement.find('errors').remove();
            //compile the directive
            $compile(iElement)(scope.$parent);
        }
      }
    };
  }]);
})();
;angular.module('tink.validation').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/transclude.html',
    "<div class=\"row form-group\"> <div class=col-xs-12> <label for={{_name}}>{{label}}</label> </div> <div class=\"col-xs-12 col-sm-6\"> <div class=validation ng-transclude> </div> <span class=help-block>{{information}}</span> </div> <div class=\"col-xs-12 col-sm-6 errors_show\"> </div> </div>"
  );

}]);
