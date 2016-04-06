

angular
  .module('surfSup', ['$ngRoute'])
  .config(function($ngProvider) {
    $routeProvider
      .when('/login', {
        template: "<h1>we are working!</h1>",
        controller: "loginController"
      }
  });
