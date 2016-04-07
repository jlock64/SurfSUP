angular
  .module('surfSup')
  .service('UserService', function($http) {
    var loginUrl = '/login';
    function loginUser(username, password) {
      return $http.post(loginUrl, username, password);
    }

    var logoutUrl = '/logout';
    function logoutUser() {
      console.log('user logged out', logoutUrl);
      return $http.get(logoutUrl);
    }

    var createUrl = '/user';
    function addAcct(info) {
      return $http.post(createUrl, info);
    }

    return {
      addAcct: addAcct,
      loginUser: loginUser,
      logoutUser: logoutUser
    };
  });
