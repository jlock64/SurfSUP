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

<<<<<<< HEAD
  }); // end of LoginController
=======

    $scope.logout = function() {
      LoginService.logoutUser();
      console.log('logging out');
    }

  }) // end of LoginController
>>>>>>> 3f6f12131ac0ac7e3bb3514794747b205b925695
