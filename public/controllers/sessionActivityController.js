// angular
//   .module('surfSup')
//   .controller('SessionActivityController', function ($scope, SessionService, CacheEngine) {
//
//     if (CacheEngine.get('seshActivity')){
//       var cache = CacheEngine.get('seshActivity');
//       $scope.seshActivity = cache;
//       console.log('cache is working!');
//     }
//     else {
//         SessionService.getSession()
//         .then(function(data) {
//           CacheEngine.put('seshActivity', data);
//           $scope.seshActivity = data;
//           window.glow = data;
//           console.log('data pulling is working!');
//         ;});
//     }
//
//     $scope.deleteSession = function (id) {
//       console.log('this is id', id);
//       SessionService.deleteSession(id);
//     };
//
//     $scope.editSession = function (editedSession) {
//       SessionService.editSession(editedSession);
//     };
// 
//
//   }); // end of SessionActivityController
