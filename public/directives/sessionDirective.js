angular
.module ('surfSup')
.directive ('sessionReader', function (){
  return {
    templateUrl: '../templates/session-reader.html',
    controller: 'SessionController',
    restrict: 'E',
    scope: {
      activity: '=',
    }
  };
});
