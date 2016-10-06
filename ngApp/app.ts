'use strict';
namespace app {
  angular.module('app', ['ui.router', 'ngResource', 'ui.bootstrap', 'angular.chips'])
    .config((
    $stateProvider: ng.ui.IStateProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider,
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
    })
    .state('Login', {
      url: '/login',
      templateUrl: '/modules/User/view/Login.html',
      controller: app.Controllers.UserController,
      controllerAs: 'vm'
    })
    .state('CreateBoard', {
      url: '/createboard',
      templateUrl: '/modules/Board/view/CreateBoard.html',
      controller: app.Controllers.CreateBoardController,
      controllerAs: 'vm'
    })
    .state('Boards', {
      url: '/boards',
      templateUrl: '/modules/Board/view/BoardsPage.html',
      controller: app.Controllers.BoardController,
      controllerAs: 'vm'
    });
    
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
