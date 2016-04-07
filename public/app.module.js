var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: "templates/login.html",
        controller: "LoginController"
      })
      .when('/create', {
        templateUrl: "templates/create.html",
        controller: "CreateAcctController"
      });
  });
require('./services/service.createAcct.js');
require('./services/service.loginService.js');
require('./controllers/controller.createAcct.js');
require('./controllers/controller.login.js');
