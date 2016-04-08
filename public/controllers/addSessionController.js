angular
  .module('surfSup')
  .controller('AddSessionController', function($scope, $location, SessionService) {
<<<<<<< HEAD
    $scope.sessionObj = {
      time: new Date()
    };
=======

      // $scope.suppy = false;

    // $scope.time = new Date('');
>>>>>>> 2fa6e7cfa41dca481a187ba6f294aa77164e38d2
    $scope.addSesh = addSesh;

    function addSesh () {
      $scope.sessionObj = {
        // time: $scope.time,
        isSurf: $scope.suppy,
        // location: $scope.location
      };
      // console.log($scope.suppy);
      console.log("session obj", $scope.sessionObj);
      SessionService.addSession($scope.sessionObj);
      console.log("session button being clicked");
    }
  });
