'use strict';
namespace app.Controllers {
  export class CreateBoardController {
    public board;
    
    public createBoard(){
      let board = {
        title: this.board.title,
        category: this.board.category,
        tags: this.board.tags
      }
      this.BoardService.saveBoard(board).then((res) => {
        this.$location.path('/boards');
      });
    }

    constructor(
      private $location: ng.ILocationService,
      private BoardService: app.Services.BoardService
    ){

    }
  }
  angular.module('app').controller('CreateBoardController', CreateBoardController);
}
