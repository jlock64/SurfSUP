angular
.module ('surfSup')
.directive ('mapReader', function (){
  return {
    templateUrl: '../templates/map.html',
    controller: 'SessionController',
    restrict: 'E',
    scope: {
    }
  };
});
