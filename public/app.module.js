var angular = require('angular');
var angularRoute = require('angular-route');
angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: "templates/homepage.html",
        controller: "UserController"
      })
      .when('/login', {
        templateUrl: "templates/login.html",
        controller: "UserController"
      })
      .when('/create', {
        templateUrl: "templates/create.html",
        controller: "UserController"
      })
      .when('/addSession', {
        templateUrl: "templates/addSession.html",
        controller: "UserController"
<<<<<<< HEAD
      });
=======
      })
>>>>>>> e06aad7935a45a6d659f90da5b4e46a4ca379543

  });
require('./services/userService.js');
require('./controllers/UserController.js');
