var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateURL: "login.html",
        controller: "loginController"
      })
      .when('/create', {
        templateURL: "create.html",
        controller: "createController"
      });
  });
