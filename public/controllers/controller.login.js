angular
  .module('surfSup')
  .controller('LoginController', function($scope, LoginService) {

    $scope.loginObj = {};
    $scope.login = function() {
      console.log('login object:', $scope.loginObj);
      LoginService.loginUser($scope.loginObj);
    };

  }) // end of LoginController
