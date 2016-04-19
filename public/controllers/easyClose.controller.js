angular.module('surfSup')
.controller('EasyCloseController', function ($scope) {
  $scope.easyCloseMenu = easyCloseMenu;
  function easyCloseMenu () {
    $scope.easyClose = true;
  }
});
