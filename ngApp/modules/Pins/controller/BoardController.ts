'use strict';
namespace app.Controllers {
  export class BoardController{
    public boards;
    
    constructor(
      private BoardService: app.Services.BoardService
    ){
      BoardService.getAllBoards().then((res) => {
        this.boards = res;
      });
      
    }
  }
  angular.module('app').controller('BoardController', BoardController);
}