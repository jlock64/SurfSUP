angular
  .module('surfSup')
  .service('FriendService', function($http, $rootScope) {


    var searchFriendsUrl = '/user';
    var friendInvitationUrl = '/friend';
    var acceptInvitationUrl = '/friend/friend';
    var requestAmtUrl = '/requestAmt';
    var requestListUrl = '/requests';
    var friendsListUrl = '/friend';
    var denyRequestUrl = '/deny';
    var deleteFriendUrl = '/friend'

    function findFriends() {
      return $http.get(searchFriendsUrl);
    }

    function friendInvitation(username) {
      return $http.post(friendInvitationUrl, username);
    }

    function acceptInvitation (username) {
      return $http.post(acceptInvitationUrl, username);
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

    function deleteFriend(id) {
      return $http.delete(deleteFriendUrl + "/" + id);
        // .then(function (res) {
        //   $rootScope.$broadcast('friend:deleted');
        //   console.log(res, 'friend deleted from list');
        // });
    }

    return {
      findFriends: findFriends,
      friendInvitation: friendInvitation,
      acceptInvitation: acceptInvitation,
      requests: requests,
      requestList: requestList,
      friendsList: friendsList,
      denyRequest: denyRequest,
      deleteFriend: deleteFriend
    };

  });
