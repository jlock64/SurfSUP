var angular = require('angular');
var angularRoute = require('angular-route');

angular
  .module('surfSup', ['$ngRoute'])
  .config(function($ngProvider) {
    $routeProvider
      .when('/create', {
        template: "create.html",
        controller: "createController"
      });
  });
