angular
  .module('surfSup')
  .controller('FriendController', function($scope, $location, FriendService, $rootScope) {

    $scope.searchFriends = searchFriends;
    $scope.sendInvite = sendInvite;
    $scope.getRequestList = getRequestList;
    // $scope.requestList = requestList;

    function getRequests() {
      FriendService.requests()
        .then(function(data) {
          $rootScope.requests = data.data;
          // console.log('friend request amt:', data.data);
        })
    }
    getRequests();

    function getRequestList() {
      FriendService.requestList()
        .then(function(data) {
          $scope.requestList = data.data[0].username;
          console.log('friend request list:', data.data[0].username);
        })
    }
    getRequestList();

    function searchFriends(friend) {
      console.log('this is a friend', friend);
      FriendService.findFriends(friend);
    }

    FriendService.findFriends()
    .then(function(data) {
      // CacheEngine.put('seshActivity', data);
      $scope.listFriends = data.data;
      window.glow = data;
      console.log('friends list is working,', data);
    });

    function sendInvite (username) {
      console.log(username);
      FriendService.friendInvitation(username)
      .then(function(data) {
        console.log('invite friends is working,', data);
      });
    }


  }); // end of FriendController
