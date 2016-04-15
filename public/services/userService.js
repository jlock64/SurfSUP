angular
  .module('surfSup')
  .service('UserService', function($http) {

    var loginUrl = '/login';
    var logoutUrl = '/logout';
    var createUrl = '/user';
    var currentUserUrl = '/currentUser';

    function loginUser(username, password) {
      return $http.post(loginUrl, username, password);
    }

    function logoutUser() {
      console.log('user logged out', logoutUrl);
      return $http.get(logoutUrl);
    }

    function addAcct(info) {
      return $http.post(createUrl, info);
    }

    function currentUser(){
      return $http.get(currentUserUrl);
    }

    return {
      addAcct: addAcct,
      loginUser: loginUser,
      logoutUser: logoutUser,
      currentUser: currentUser
    };
  });
