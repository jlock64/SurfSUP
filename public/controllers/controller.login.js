angular
  .module('surfSup')
  .controller('LoginController', function($scope, LoginService) {

    $scope.loginObj = {};

    $scope.login = function() {
      console.log('login object:', $scope.loginObj);
      LoginService.loginUser($scope.loginObj).success(function (res) {
        console.log('we can redirect here if so', res);
      })
      .error(function (err) {
        console.log('doh');
      })
    };


    $scope.logout = function() {
      LoginService.logoutUser();
      console.log('logging out');
    }

  }) // end of LoginController
