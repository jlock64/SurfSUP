var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/login', {
        template: "<h1> create is working! </h1>",
      })
      .when('/create', {
        templateUrl: "templates/create.html",
      });
  });
