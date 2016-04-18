angular
  .module('surfSup')
  .controller('ProfileController', function($scope,$location, FriendService, $routeParams,$rootScope) {
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;
    $scope.sendInvite = sendInvite;
    $scope.hideAddButton = hideAddButton;

      // GET FRIENDS PROFILE
      FriendService.getProfile($routeParams.id)
      .then(function(data) {
        // console.log('friend profile info: ', data.data);
        $scope.profiles = data.data;
        FriendService.friendsList()
          .success(function(friends){
            // console.log('before map function: ', friends);
            var friendsIdList = _.map(friends, function(el) {
              return el.id;
            });
            // console.log('$routeParams.id:', $routeParams.id);
            // console.log('friendsIdList:',friendsIdList);
            if(friendsIdList.indexOf(+$routeParams.id) !== -1) {
              // Hide button here.
              // console.log('inside indexof method');
              hideAddButton();
            }
          })
      },function(err) {
        console.log("THIS IS AN ERROR",err);
      });

      // GET CURRENT USER PROFILE
      FriendService.getProfile($routeParams.id)
      .then(function(data) {
        $scope.profiles = data.data;
        console.log('getProfile', $scope.profiles.id )
        console.log('$routeParams.id', $routeParams.id)
      }).then(function() {
        if(+$routeParams.id === $scope.profiles.id) {
          hideAddButton();
        }
      })

      // HIDE ADD BUTTON ON FRIENDS PROFILE PAGE
      function hideAddButton () {
        console.log('in hide button');
        $scope.dontShowButton = true;
      }

      // SEND INVITATION TO FRIEND
      function sendInvite (username) {
        console.log("send invite is being pressed");
        FriendService.friendInvitation(username)
        .success(function(data) {
          console.log('send invite is working,', data);
        })
        .error (function(err) {
          console.log('this friend has already been invited', err);
          $('#requestFriendAlert').html('<div class="alert alert-danger" role="alert">You have already sent this friend a request.</div>');
        });
      }


  }); // end of FriendController
