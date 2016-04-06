

angular
  .module('surfSup', ['$ngRoute'])
  .config(function($ngProvider) {
    $routeProvider
      .when('/create', {
        template: "<h1> create is working! </h1>",
        controller: "createController"
      });
  });
