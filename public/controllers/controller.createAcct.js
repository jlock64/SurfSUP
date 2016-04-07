angular
.module('surfSup')
.controller('CreateAcctController', function ($scope, CreateAcctService){

  $scope.acctObj = {};
  $scope.submitForm = function () {
    console.log('account object:', $scope.acctObj);
    CreateAcctService.addAcct($scope.acctObj);
  };

}); //end of controller
