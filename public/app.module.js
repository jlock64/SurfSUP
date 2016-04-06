var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        template: "<h1>login.html</h1>",
        // controller: "loginController"
      })
      .when('/create', {
        templateURL: "create.html",
        controller: "createController"
      });
  });
