angular
  .module('surfSup')
  .controller('ProfileController', function($scope,$location, FriendService, $routeParams,$rootScope) {
    $location.path() === "/login" || $location.path() === "/create" ? $rootScope.showBar = false : $rootScope.showBar = true;

      FriendService.getProfile($routeParams.id)
      .then(function(data) {
        $scope.profiles = data.data
      },function(err) {
        console.log("THIS IS AN ERROR",err);
      })



  }); // end of FriendController
