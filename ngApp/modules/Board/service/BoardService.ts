'use strict';
namespace app.Services{
  export class BoardService{
    public boardResource;
    public allBoardsResource;
    
    public saveBoard(board){
      console.log(board);
      return this.boardResource.save(board).$promise;
    };
    
    public getAllBoards(){
      return this.allBoardsResource.query().$promise;
    }
    
    public getBoard(id){
      return this.boardResource.get({ id: id }).$promise;
    }
    
    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService,
      private $http: ng.IHttpService,
      private $q: ng.IQService
    ){
      this.boardResource = $resource('/api/v1/boards/:id', null, { 'update': {method: 'PUT'}});
      this.allBoardsResource = $resource('/api/v1/boards/getAllBoards');
    }
  }
  angular.module('app').service('BoardService', BoardService);
}
