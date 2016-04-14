angular
  .module('surfSup')
  .controller('FriendController', function($scope, $location, FriendService, $rootScope) {

    $scope.searchFriends = searchFriends;
    $scope.sendInvite = sendInvite;
    $scope.getRequestList = getRequestList;
    $scope.getFriendsList = getFriendsList;
    $scope.denyFriendRequest = denyFriendRequest;
    $scope.acceptInvite = acceptInvite;
    $scope.deleteFriendFromList = deleteFriendFromList;
    // $scope.requestList = requestList;

    function getFriendsList() {
      FriendService.friendsList()
        .success(function(data){
          console.log('in getFriendsList', data);
          // window.glob = data;
          $scope.friendsList = data;
        });
    }
    getFriendsList();

    function getRequests() {
      FriendService.requests()
        .success(function(data) {
          $rootScope.requests = data;
          // console.log('friend request amt:', data);
        });
    }
    getRequests();

    function getRequestList() {
      FriendService.requestList()
        .success(function(data) {
          $rootScope.requestList = data;
          // console.log('friend request list:', data);
          // window.glob = data.data;
        });
    }
    getRequestList();

    function denyFriendRequest (id) {
      FriendService.denyRequest(id)
        .then(function(data) {
          var objId = id;
          var objPlace = $rootScope.requestList.findIndex (function(el,idx,arr){
            return el.id === objId;
          });
          $rootScope.requestList.splice (objPlace, 1);
          // console.log('sessions deleted', objPlace);
      });
    }

    function searchFriends(friend) {
      console.log('this is a friend', friend);
      FriendService.findFriends(friend);
    }

    FriendService.findFriends()
    .then(function(data) {
      // CacheEngine.put('seshActivity', data);
      $scope.listUsers = data.data;
      window.glow = data;
      // console.log('users list is working,', data);
    });

    function sendInvite (username) {
      // console.log(username);
      FriendService.friendInvitation(username)
      .then(function(data) {
        // console.log('invite friends is working,', data);
      });
    }

    // //Invite updated
    // $scope.$on('invite:added', function() {
    //   FriendService.friendInvitation()
    //   .then(function(data) {
    //     $rootScope.requests = data;
    //     console.log('invite was added!', data);
    //   });
    // });

    function acceptInvite (username) {
      console.log(username);
      FriendService.acceptInvitation(username)
      .then(function(data) {
        console.log('accept friends is working,', data);
      });
    }

    // DELETE FRIEND FROM FRIEND LIST
    function deleteFriendFromList(id) {
        console.log('id of friend to be deleted', id);
        FriendService.deleteFriend(id)
        .then(function(data) {
          console.log(data);
        //   var objId = id;
        //   var objPlace = $scope.seshActivity.findIndex (function(el,idx,arr){
        //     return el.id === objId;
        //   });
        //   $scope.seshActivity.splice (objPlace, 1);
        //   console.log('deny requests', objPlace);
        });
      }

  }); // end of FriendController
