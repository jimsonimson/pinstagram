'Use strict';
namespace app.Services{
  export class UserService{
    public status = {
      _id: null,
      email: null,
      username: null,
      appointments: null,
      hairstyles: null,
      profession: null,
      firstName: null,
      lastName: null,
      avatar: null,
      about: null,
      pics: null,
      availability: null,
      tags: null,
      barbershop: null,
      barbershopAddress: null,
      socialMedia: null
    }
    public UserRegisterResource;
    public UserLoginResource;
    public UserAllResource;
    public UserResource;

    public register(user){
      return this.UserRegisterResource.save(user).$promise;
    };

    public login(user){
      return this.UserLoginResource.save(user).$promise;
    };

    public setToken(token){
      this.$window.localStorage.setItem('token',token);
    };

    public setUser(){
      let u = JSON.parse( atob( this.$window.localStorage.getItem('token').split('.')[1] ) );
      this.status._id = u._id;
      this.status.email = u.email;
      this.status.username = u.username;
      this.status.appointments = u.appointments;
      this.status.hairstyles = u.hairstyles;
      this.status.profession = u.profession;
      this.status.firstName = u.firstName;
      this.status.lastName = u.lastName;
      this.status.avatar = u.avatar;
      this.status.about = u.about;
      this.status.pics = u.pics;
      this.status.availability = u.availability;
      this.status.tags = u.tags;
      this.status.barbershop = u.barbershop;
      this.status.barbershopAddress = u.barbershopAddress;
      this.status.socialMedia = u.socialMedia;
    };

    public removeToken(){
      this.$window.localStorage.removeItem('token');
    };

    public removeUser(){
      this.status._id = null;
      this.status.email = null;
      this.status.username = null;
      this.status.appointments = null;
    };

    // Keep user logged in with page refresh
    public getToken() {
      return this.$window.localStorage.getItem("token");
    };

    //Get individual user info
    public getUser(userId){
      let q = this.$q.defer();
      this.$http.get('/api/v1/users/' + userId).then((res)=>{
        q.resolve(res.data);
      }, (err)=>{
        q.reject(err);
      });
      return q.promise;
    };

    //Get all users
    public getUsers(){
      return this.UserAllResource.query().$promise;
    }
    
    public updateUser(user){
      let q = this.$q.defer();
      this.$http.put('/api/v1/users', user).then((res)=>{
        q.resolve(res.data);
      }, (err)=>{
        console.log("error")
        q.reject(err);
      });
      return q.promise;
    }

    constructor(
      private $resource: ng.resource.IResourceService,
      private $window: ng.IWindowService,
      private $http: ng.IHttpService,
      private $q: ng.IQService
    ){
      this.UserAllResource = $resource('api/v1/users');
      this.UserRegisterResource = $resource('/api/v1/users/register');
      this.UserLoginResource = $resource('/api/v1/users/login');
      if (this.getToken()) this.setUser();

    }
  }
  angular.module('app').service('UserService', UserService);
}
