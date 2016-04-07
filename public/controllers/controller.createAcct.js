angular
.module('surfSup')
.controller('CreateAcctController', function ($scope, $location, CreateAcctService){

  $scope.acctObj = {};
  $scope.submitForm = function () {
    console.log('account object:', $scope.acctObj);
    CreateAcctService.addAcct($scope.acctObj);
    $location.path('/home')
  };

}); //end of controller
