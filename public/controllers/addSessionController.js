angular
  .module('surfSup')
  .controller('AddSessionController', function($scope, $location, SessionService) {
    $scope.sessionObj = {
      time: new Date()
    };

<<<<<<< HEAD
    $scope.addSesh = addSesh;

    function addSesh () {
      $scope.sessionObj = {
        time: $scope.time,
=======
      // $scope.suppy = false;

    // $scope.time = new Date('');
    // $scope.listSesh = listSesh;
    $scope.addSesh = addSesh;

    function addSesh () {
      $scope.sessionObjs = {
        time: $scope.time.toISOString().slice(0,19),
>>>>>>> 6ecc21a7a617d9d64ef521d340d9fd4c7a54340c
        isSurf: $scope.suppy,
        location: $scope.location
      };
      // console.log($scope.suppy);
      console.log("session obj", $scope.sessionObjs);
      SessionService.addSession($scope.sessionObjs).success(function(res){
        console.log('session created', res);
        $location.path('/sessions');
      })
      .error(function(err) {
        console.log('doh', err);
        $('#sessionTime').html('<div class="alert alert-danger" role="alert"><strong>Oh no!</strong> The username and password do not match. Try again.</div>');
      })
    } // end of addSesh()



  }); // end of AddSessionController
