var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/create', {
        templateURL: "<h1>hello</h1>"
      });
  });
