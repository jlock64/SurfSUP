var angular = require('angular');
var angularRoute = require('angular-route');
var uiMask = require('angular-ui-mask');

angular
  .module('surfSup', ['ngRoute', uiMask])
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
      });
  });
require('./services/userService.js');
require('./controllers/UserController.js');
