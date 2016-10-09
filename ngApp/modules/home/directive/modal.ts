angular.module('app').directive('pinmodal', () => ({
  restrict: 'A',
  link: function(scope, elem, attrs) {
    $('.ui.basic.modal').modal('attach events', '.test.button', 'show');   
    }
}));