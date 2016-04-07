angular
  .module('surfSup')
  .controller('LoginController', function($scope, LoginService) {

    $scope.login = login;
    $scope.logout = logout;
    $scope.loginObj = {};

    function login() {
      console.log('login object:', $scope.loginObj);
      LoginService.loginUser($scope.loginObj).success(function (res) {
        console.log('we can redirect here if so', res);
      })
      .error(function (err) {
        console.log('doh');
        $('#usernameAlert').html('<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> You have entered the wrong password! Try again.</div>');
      })
    };


    function logout() {
      LoginService.logoutUser();
      console.log('logging out');
    }

  }) // end of LoginController
