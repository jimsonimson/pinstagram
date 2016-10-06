namespace app.Controllers {
  export class HomeController {
    public user;
    
    public createBoard(){
      this.$location.path('/createboard');
    }

    constructor(
      private UserService: app.Services.UserService,
      private $location: ng.ILocationService
    ) {
      this.user = UserService.status;
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
