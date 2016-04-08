angular
  .module('surfSup')
  .controller('AddSessionController', function($scope, $location, SessionService) {
    $scope.sessionObj = {
      time: new Date()
    };
    $scope.addSesh = addSesh;
    function addSesh () {
      console.log("session obj", $scope.sessionObj);
      SessionService.addSession($scope.sessionObj, $scope.surf);
      console.log("session button being clicked");
    }
  });
