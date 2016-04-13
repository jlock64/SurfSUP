angular
  .module('surfSup')
  .service('FriendService', function($http, $rootScope) {


    var searchFriendsUrl = '/user';
    var friendInvitationUrl = '/friend';
    var requestAmtUrl = '/requestAmt';
    var requestListUrl = '/requests';
    var friendsListUrl = '/friend';
    var denyRequestUrl = '/deny';

    function findFriends() {
      return $http.get(searchFriendsUrl);
    }

    function friendInvitation(username) {
      return $http.post(friendInvitationUrl, username);
      // .then(function(res) {
      //     console.log(res);
      //     $rootScope.$broadcast('invite:added');
      //   });
    }

    function requests() {
      return $http.get(requestAmtUrl);
    }

    function requestList() {
      return $http.get(requestListUrl);
    }

    function friendsList() {
      return $http.get(friendsListUrl);
    }

    function denyRequest (id) {
      return $http.delete(denyRequestUrl + "/" + id)
      .then(function(res) {
          console.log(res);
          $rootScope.$broadcast('invite:deleted');
        });
    }

    return {
      findFriends: findFriends,
      friendInvitation: friendInvitation,
      requests: requests,
      requestList: requestList,
      friendsList: friendsList,
      denyRequest: denyRequest
    };

  });
