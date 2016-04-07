var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        template: "<h1> login working </h1>",
      })
      .when('/create', {
        templateUrl: "templates/create.html",
        controller: "CreateAcctController"
      });
  });
require('./services/service.createAcct.js');
require('./controllers/controller.createAcct.js');
