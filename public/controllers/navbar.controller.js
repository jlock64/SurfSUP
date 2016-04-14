angular
  .module('surfSup')
  .controller('NavbarController', function($scope,$location, $rootScope, FriendService) {

    $scope.$on('requestAmt:added', function(data) {
      console.log("request amount broadcast",data);

      FriendService.requestAmt()
      .then(function(data) {
        $rootScope.requests = data.data;
        // $rootScope.$apply();
        console.log('friend request amt:', data);
      });
    });


  }); // end of NavbarControler
