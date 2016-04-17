angular
  .module('surfSup')
  .controller('SessionController', function($scope, $location, SessionService, CacheEngine, $rootScope) {
    console.log("CALLING ALL SESH");
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;
    $scope.addSesh = addSesh;
    $scope.deleteSession = deleteSession;
    $scope.editSession = editSession;
    $scope.activeButtonSurf = activeButtonSurf;
    $scope.activeButtonSUP = activeButtonSUP;
    $scope.buttonsClicked = false;
    $scope.joinSession = joinSession;
    $scope.allGoingToSesh = allGoingToSesh;
    $scope.location = [];

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
      console.log("SCOPE LOCATION", $scope.location);
      $scope.sessionObjs = {
        time: $scope.time ? $scope.time.toISOString().slice(0,19) : "",
        isSurf: $scope.suppy,
        //we'll need a LONG and LAT and maybe keep LOCATION for typing in
        location: $scope.location,
        lat: $scope.map.markers[0].coords.latitude,
        lon: $scope.map.markers[0].coords.longitude,
      };
        console.log("session obj", $scope.sessionObjs);
        SessionService.addSession($scope.sessionObjs).then(function(res){
        console.log('session created', res);
        $location.path('/sessions');
        // $scope.$apply();
      });
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
        console.log("Markers:, ", $scope.map.markers);
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

    // EDIT SESSION
    function editSession(id,location) {
      console.log('location',location);
      SessionService.editSession(id,location);
    }

    //ONLY LET CURRENT USER EDIT SESSION




    //Changing Color when SUP/SURF is clicked
  	$scope.isActiveSurf = false;
    function activeButtonSurf () {
      $scope.buttonsClicked = true;
      $scope.isActiveSurf = !$scope.isActiveSurf;
    }
  	$scope.isActiveSUP = false;
    function activeButtonSUP () {
      $scope.buttonsClicked = true;
      $scope.isActiveSUP = !$scope.isActiveSUP;
    }

    function joinSession(id) {
      console.log('this is joinsession id:', id);
      SessionService.joinSesh(id)
        .then(function() {
          SessionService.getSession()
          .then(function(data) {
            CacheEngine.put('seshActivity', data);
            $scope.seshActivity = data.data;
          });
        })
    }

    function allGoingToSesh(id) {
      console.log('new person going to this sesh:', id);
      SessionService.getAllGoingToSesh(id)
        .then(function(data) {
          console.log('all going to sesh in ctrl:', data);
          $scope.usersGoingToSesh = data;
          // console.log('data', data.data.username);
        })
        // .then(function() {
        //   SessionService.getSession()
        //   .then(function(data) {
        //     CacheEngine.put('seshActivity', data);
        //     $scope.seshActivity = data.data;
        //   });
        // })

    }
    $scope.map = {
      center: {
          latitude: 32.7799400,
          longitude:-79.9341970
      },
      zoom: 11,
      markers: [],
      events: {
      click: function (map, eventName, originalEventArgs) {
          $scope.$apply(function(){
          var e = originalEventArgs[0];
          var lat = e.latLng.lat(),lon = e.latLng.lng();
          var marker = {
              id: Date.now(),
              coords: {
                  latitude: lat,
                  longitude: lon
              }
          };
          $scope.location.push({
            lat: lat,
            lon: lon
          });
          console.log("location: ", $scope.location);
          $scope.map.markers.pop(); //only can add one marker
          $scope.map.markers.push(marker);
          console.log('MARKERS:', $scope.map.markers);
          window.glow = $scope.map.markers;
        });
      }
  }
  };
  //GOOGLE MAP
  // angular.extend($scope, {
  //     map: {
  //         center: {
  //             latitude: 32.7799400,
  //             longitude:-79.9341970
  //         },
  //         zoom: 11,
  //         markers: [],
  //         events: {
  //         click: function (map, eventName, originalEventArgs) {
  //             var e = originalEventArgs[0];
  //             var lat = e.latLng.lat(),lon = e.latLng.lng();
  //             var marker = {
  //                 id: Date.now(),
  //                 coords: {
  //                     latitude: lat,
  //                     longitude: lon
  //                 }
  //             };
  //             $scope.map.markers.push(marker);
  //             console.log('MARKERS:', $scope.map.markers.markers);
  //             window.glow = $scope.map.markers;
  //             $scope.mapCoords = $scope.map.markers;
  //             $scope.$apply();
  //         }
  //     }
  //     }
  // });




  }); // end of SessionController
