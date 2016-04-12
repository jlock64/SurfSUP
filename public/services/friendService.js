angular
  .module('surfSup')
  .service('FriendService', function($http) {

    var searchFriendsUrl = '/user';
    function findFriends() {
      console.log('finding friends', searchFriendsUrl);
      return $http.get(searchFriendsUrl);
    }

    var friendInvitationUrl = '/friend';
    function friendInvitation(username) {
      console.log('inviting friends', friendInvitationUrl);
      return $http.post(friendInvitationUrl, username);
    }

    var requestAmtUrl = '/requestAmt';
    function requests() {
      console.log('friend requests', requestAmtUrl);
      return $http.get(requestAmtUrl);
    }

    var requestListUrl = '/requests';
    function requestList() {
      console.log('request list:', requestListUrl);
      return $http.get(requestListUrl);
    }



    return {
      findFriends: findFriends,
      friendInvitation: friendInvitation,
      requests: requests,
      requestList: requestList
    };

  });
