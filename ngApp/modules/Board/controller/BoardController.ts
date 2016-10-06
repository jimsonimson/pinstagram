'use strict';
namespace app.Controllers {
  export class BoardController{
    public boards;
    
    constructor(
      private BoardService: app.Services.BoardService
    ){
      this.boards = this.BoardService.getAllBoards();
    }
  }
  angular.module('app').controller('BoardController', BoardController);
}