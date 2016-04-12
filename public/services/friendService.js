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

    return {
      findFriends: findFriends,
      friendInvitation: friendInvitation
    };

  });
