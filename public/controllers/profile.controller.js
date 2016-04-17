angular
  .module('surfSup')
  .controller('ProfileController', function($scope,$location, FriendService, $routeParams,$rootScope) {
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;
    $scope.sendInvite = sendInvite;

      // GET USERS PROFILE
      FriendService.getProfile($routeParams.id)
      .then(function(data) {
        console.log('user profile info: ', data.data);
        $scope.profiles = data.data;
      },function(err) {
        console.log("THIS IS AN ERROR",err);
      });


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
