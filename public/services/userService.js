angular
  .module('surfSup')
  .service('UserService', function($http) {

    var loginUrl = '/login';
    var logoutUrl = '/logout';
    var createUrl = '/user';

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

    return {
      addAcct: addAcct,
      loginUser: loginUser,
      logoutUser: logoutUser
    };
  });
