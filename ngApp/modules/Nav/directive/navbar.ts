angular.module('app').directive('navbar', () => ({
  templateUrl: '../view/navbar.html',
  restrict: 'A',
  controller: 'NavbarController',
  controllerAs: 'vm',
  link: function(scope, elem, attrs) {
      function checkScroll(){
        var startY = $('.navbar').height() * 2; //The point where the navbar changes in px
        
        if($(window).scrollTop() > startY){
          $('.navbar').addClass("scrolled");
        }else{
          $('.navbar').removeClass("scrolled");
        }
      }
      
      if($('.navbar').length > 0){
        $(window).on("scroll load resize", function(){
          checkScroll();
        });
      }
    }
}));
