angular
  .module('surfSup')
  .service('LoginService', function($http) {
    var loginUrl = '/login';
    function loginUser(username, password) {
      return $http.post(loginUrl, username, password)
    };

    var logoutUrl = '/logout';
    function logoutUser() {
      console.log('user logged out', logoutUrl);
      return $http.get(logoutUrl)

    };

    return {
      loginUser: loginUser,
      logoutUser: logoutUser
    };
  });
