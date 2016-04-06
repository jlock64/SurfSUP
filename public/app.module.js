var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        template: "<h1> create is working! </h1>",
        controller: "loginController"
      });
      .when('/create', {
        templateURL: "<h1>hello</h1>"
      });
  });
