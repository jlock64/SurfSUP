angular
  .module('surfSup')
  .service('FriendService', function($http) {

    var searchFriendsUrl = '/user';
    function findFriends() {
      return $http.get(searchFriendsUrl);
    }

    var friendInvitationUrl = '/friend';
    function friendInvitation(username) {
      return $http.post(friendInvitationUrl, username);
    }

    var requestAmtUrl = '/requestAmt';
    function requests() {
      return $http.get(requestAmtUrl);
    }

    var requestListUrl = '/requests';
    function requestList() {
      return $http.get(requestListUrl);
    }

    var friendsListUrl = '/friend';
    function friendsList() {
      return $http.get(friendsListUrl);
    }



    return {
      findFriends: findFriends,
      friendInvitation: friendInvitation,
      requests: requests,
      requestList: requestList,
      friendsList: friendsList
    };

  });
