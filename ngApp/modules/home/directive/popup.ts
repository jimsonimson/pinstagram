angular.module('app').directive('popup', () => ({
  restrict: 'A',
  link: function(scope, elem, attrs) {
       $('.ui.button').popup({
        on: 'click'
       });   
    }
}));