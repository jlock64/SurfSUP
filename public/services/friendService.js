angular
  .module('surfSup')
  .service('FriendService', function($http) {

    var searchFriendsUrl = '/user';
    function findFriends() {
      console.log('finding friends', searchFriendsUrl);
      return $http.get(searchFriendsUrl);
    }

    return {
      findFriends: findFriends,
    }

  });
