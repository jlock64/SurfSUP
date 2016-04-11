angular
  .module('surfSup')
  .controller('SessionController', function($scope, $location, SessionService, CacheEngine) {

    $scope.addSesh = addSesh;
    $scope.deleteSession = deleteSession;
    $scope.editSession = editSession;

    // CacheEngine
    if (CacheEngine.get('seshActivity')){
      var cache = CacheEngine.get('seshActivity');
      $scope.seshActivity = cache.data;
      console.log('cache is working! seshActivity =', cache);
    }
    else {
        SessionService.getSession()
        .then(function(data) {
          CacheEngine.put('seshActivity', data);
          $scope.seshActivity = data.data;
          window.glow = data;
          console.log('data pulling is working! seshActivity =', data);
        });
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
      SessionService.deleteSesh(id)
      .then(function(data) {
        var objId = id;
        var objPlace = $scope.seshActivity.findIndex (function(el,idx,arr){
          return el.id === objId;
        });
        $scope.seshActivity.splice (objPlace, 1);
        console.log('sessions deleted', objPlace);
      });

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
