angular
  .module('surfSup')
  .service('LoginService', function($http) {
    var loginUrl = '/login';
    function loginUser(username, password) {
      return $http.post(loginUrl, username, password)
    }
    return {
      loginUser: loginUser
    };
  });
