angular
  .module('surfSup')
  .controller('FriendController', function($scope,$q, $location, FriendService, $rootScope,SessionService) {
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;

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

  function getRequestAmt() {
      FriendService.requestAmt()
        .then(function(data) {
          $rootScope.requests = data.data;
          // $rootScope.$apply();
          console.log('friend request amt:', data);
        });
    }
    getRequestAmt();

    function getRequestList() {
      FriendService.requestList()
        .success(function(data) {
          $rootScope.requestList = data;
          console.log('friend request list:', data);
          // window.glob = data.data;
        })
        .error (function(err) {
          console.log(err);
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
      .success(function(data) {
        console.log('send invite is working,', data);
      })
      .error (function(err) {
        console.log('this friend has already been invited', err);
        $('#requestFriendAlert').html('<div class="alert alert-danger" role="alert">You have already sent this friend a request.</div>');
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
      .success(function(data) {
        console.log('accept friends is working,', data);
        $rootScope.$broadcast('requestAmt:added',data.data);
      })
      .error (function(err) {
        console.log(err);
      });
    }

    // DELETE FRIEND FROM FRIEND LIST
    function deleteFriendFromList(id) {
        console.log('id of friend to be deleted', id);
        FriendService.deleteFriend(id)
        .then(function(data) {
          console.log('data from delete friend', data);
          var objId = id;
          var objPlace = $scope.friendsList.findIndex (function(el,idx,arr){
            return el.id === objId;
          });
          $rootScope.friendsList.splice (objPlace, 1);
          // console.log('sessions deleted', objPlace);
      });
      }

  }); // end of FriendController
