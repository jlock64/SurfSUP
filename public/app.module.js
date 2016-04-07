var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: "templates/login.html",
      })
      .when('/create', {
        templateUrl: "templates/create.html",
      });
  });
