angular
  .module('surfSup')
  .controller('UserController', function($scope, $location, UserService) {

    $scope.loginObj = {};
    $scope.login = login;
    $scope.logout = logout;
    $scope.acctObj = {};
    $scope.submitForm = submitForm;

    function login() {
      console.log('login object:', $scope.loginObj);
      UserService.loginUser($scope.loginObj).success(function (res) {
        console.log('we can redirect here if so', res);
      })
      .error(function (err) {
        console.log('doh');
        $('#usernameAlert').html('<div class="alert alert-danger" role="alert"><strong>Oh snap!</strong> You have entered the wrong password! Try again.</div>');
      });
    }

    function logout() {
      UserService.logoutUser();
      console.log('logging out');
    }

    function submitForm() {
      console.log('account object:', $scope.acctObj);
      UserService.addAcct($scope.acctObj).success(function(res){
        console.log('create works');
        $location.path('/home');
      })
      .error (function (err) {
        console.log('create not working');
      });
    }

  }); // end of LoginController
