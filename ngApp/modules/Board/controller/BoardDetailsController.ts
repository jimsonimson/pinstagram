'use strict';
namespace app.Controllers {
  export class BoardDetailsController{
    public board;
    
    constructor(
      private BoardService: app.Services.BoardService,
      private $routeParams: ng.route.IRouteParamsService
    ){
      BoardService.getBoard($routeParams['id']).then((board)=>{
        this.board = board;
      });
      
    }
  }
  angular.module('app').controller('BoardDetailsController', BoardDetailsController);
}