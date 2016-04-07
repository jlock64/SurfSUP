angular
.module('surfSup')
.controller('CreateAcctController', function ($scope, CreateAcctService){

  $scope.acctObj = {};
  $scope.submitForm = function () {
    console.log('account object:', $scope.acctObj);
    CreateAcctService.addAcct($scope.acctObj).success(function(res){
      console.log('create works');
    })
    .error (function (err) {
      console.log('create not working');
    });
  };
}); //end of controller
