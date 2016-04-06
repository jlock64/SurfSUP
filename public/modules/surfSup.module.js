

angular
  .module('surfSup', ['$ngRoute'])
  .config(function($ngProvider) {
    $routeProvider
      .when('/login', {
        template: "<h1> create is working! </h1>",
        controller: "loginController"
      });
      .when('/create', {
        template: "<h1> create is working! </h1>",
        controller: "createController"
      });
  });
