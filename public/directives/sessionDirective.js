angular
.module ('surfSup')
.directive ('sessionReader', function (){
  return {
    templateUrl: '../templates/session-reader.html',
    controller: 'SessionActivityController',
    restrict: 'E',
    scope: {
      activity: '='
    }
  };
});
