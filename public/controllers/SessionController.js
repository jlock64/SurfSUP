angular
  .module('surfSup')
  .controller('SessionController', function($scope, $location, SessionService, CacheEngine) {

    $scope.seshActivity = cache;
    $scope.addSesh = addSesh;
    $scope.deleteSession = deleteSession;
    $scope.editSession = editSession;

    // seshActivity
    if (CacheEngine.get('seshActivity')){
      var cache = CacheEngine.get('seshActivity');
      $scope.seshActivity = cache;
      console.log('cache is working!');
    }
    else {
        SessionService.getSession()
        .then(function(data) {
          CacheEngine.put('seshActivity', data);
          $scope.seshActivity = data;
          window.glow = data;
          console.log('data pulling is working!');
        ;});
    }

    // addSesh
    function addSesh () {
      $scope.sessionObjs = {
        time: $scope.time.toISOString().slice(0,19),
        isSurf: $scope.suppy,
        location: $scope.location
      };
      console.log("session obj", $scope.sessionObjs);
      SessionService.addSession($scope.sessionObjs).success(function(res){
        console.log('session created', res);
        $location.path('/sessions');
      })
      .error(function(err) {
        console.log('doh', err);
        $('#sessionTime').html('<div class="alert alert-danger" role="alert"><strong>Oh no!</strong> The username and password do not match. Try again.</div>');
      });
    }

    // deleteSession
    function deleteSession(id) {
      console.log('this is id', id);
      SessionService.deleteSession(id);
      // .success(function(res) {
      //   console.log('sessions deleted', res);
      // })
      // .error(function(err) {
      //   console.log('delete session error', err);
      // })
    }

    // editedSession
    function editSession(editedSession) {
      SessionService.editSession(editedSession);
      // .success(function(res) {
      //   console.log('session edited', res);
      // })
      // .error(function(err) {
      //   console.log('edit session error', err);
      // })
    }



  }); // end of AddSessionController
