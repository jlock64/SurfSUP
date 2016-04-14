angular
  .module('surfSup')
  .controller('SessionController', function($scope, $location, SessionService, CacheEngine, $rootScope) {
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;
    $scope.addSesh = addSesh;
    $scope.deleteSession = deleteSession;
    $scope.editSession = editSession;
    $scope.activeButtonSurf = activeButtonSurf;
    $scope.activeButtonSUP = activeButtonSUP;
    $scope.buttonsClicked = false;
    // CacheEngine
    // if (CacheEngine.get('seshActivity')){
    //   var cache = CacheEngine.get('seshActivity');
    //   $scope.seshActivity = cache.data;
    //   console.log('cache is working! seshActivity =', cache);
    // }
    // else {
        SessionService.getSession()
        .then(function(data) {
          CacheEngine.put('seshActivity', data);
          $scope.seshActivity = data.data;
        });
    // }

    // addSesh
    function addSesh () {
      $scope.sessionObjs = {
        time: $scope.time ? $scope.time.toISOString().slice(0,19) : "",
        isSurf: $scope.suppy,
        location: $scope.location
      };
      console.log("session obj", $scope.sessionObjs);
      SessionService.addSession($scope.sessionObjs).then(function(res){
        console.log('session created', res);
        $location.path('/sessions');
        // $scope.$apply();
      })
      // .error(function(err) {
      //   console.log('doh', err);
      //   $('#sessionTime').html('<div class="alert alert-danger" role="alert"><strong>Oh no!</strong> The username and password do not match. Try again.</div>');
      // });
    }

    // addSesh update
    $scope.$on('session:added', function() {
      SessionService.getSession()
      .then(function(data) {
        $scope.seshActivity = data.data;
        console.log('it was added!', data);
      });
    });

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
        console.log('deny requests', objPlace);
      });
    }

    //Delete session update
    $scope.$on('session:deleted', function() {
      SessionService.getSession()
      .then(function(data) {
        $scope.seshActivity = data.data;
        console.log('it was deleted!', data);
      });
    });

    // editedSession
    function editSession(id,location) {
      console.log('location',location);
      SessionService.editSession(id,location);
    }

    //Changing Color when SUP/SURF is clicked
  	$scope.isActiveSurf = false;
    function activeButtonSurf () {
      $scope.buttonsClicked = true;
      console.log('clicky surf');
      $scope.isActiveSurf = !$scope.isActiveSurf;
    }
  	$scope.isActiveSUP = false;
    function activeButtonSUP () {
      $scope.buttonsClicked = true;
      console.log('clicky SUP');
      $scope.isActiveSUP = !$scope.isActiveSUP;
    }


  }); // end of SessionController
