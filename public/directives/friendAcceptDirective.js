angular
.module ('surfSup')
.directive ('friendAcceptReader', function (){
  return {
    templateUrl: '../templates/friendAccept-reader.html',
    controller: 'FriendController',
    restrict: 'E',
    scope: {
      friendRequests: '=',
    }
  };
});
