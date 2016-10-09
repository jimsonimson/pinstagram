'use strict';
namespace app.Controllers {
  export class NavController{
    public status;
    
    public logout(){
      this.UserService.removeToken();
      this.UserService.removeUser();
    }
    
    constructor(
      private UserService: app.Services.UserService
    ){
      this.status = UserService.status;
    }
  }
  angular.module('app').controller('NavController', NavController);
}