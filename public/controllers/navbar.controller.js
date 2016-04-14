angular
  .module('surfSup')
  .controller('NavbarController', function($scope,$location, $rootScope, FriendService) {

    $scope.$on('requestAmt:added', function(data) {
      FriendService.requestAmt()
      .then(function(data) {
        $rootScope.requests = data.data;
        // $rootScope.$apply();
      });
    });


  }); // end of NavbarControler
