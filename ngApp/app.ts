'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $urlRouterProvider: ng.ui.IUrlRouterProvider) => {

    $stateProvider.state('Home', {
      url: '/',
      templateUrl: '/modules/Home/view/home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .state('Register', {
      url: '/register',
      templateUrl: '/modules/User/view/Register.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    });
    
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  });
}
