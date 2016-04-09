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
        controller: "AddSessionController"
      })
      .when('/sessions', {
        templateUrl: "templates/sessions.html",
        controller: "AddSessionController"
      })
  });
require('./services/userService.js');
require('./services/sessionService.js');
require('./controllers/UserController.js');
require('./controllers/addSessionController.js');
