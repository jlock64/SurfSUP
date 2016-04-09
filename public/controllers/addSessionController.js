angular
  .module('surfSup')
  .controller('AddSessionController', function($scope, $location, SessionService) {
    $scope.sessionObj = {
      time: new Date()
    };

    $scope.addSesh = addSesh;

    function addSesh () {
      $scope.sessionObj = {
        time: $scope.time,
        isSurf: $scope.suppy,
        location: $scope.location
      };
      // console.log($scope.suppy);
      console.log("session obj", $scope.sessionObj);
      SessionService.addSession($scope.sessionObj);
      console.log("session button being clicked");
    }
  });
