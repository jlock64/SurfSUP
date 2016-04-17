angular
.module ('surfSup')
.directive ('mapReader', function (){
  return {
    templateUrl: '../templates/map-reader.html',
    controller: 'SessionController',
    restrict: 'E',
    scope: {
    }
  };
});
