angular
  .module('surfSup')
  .service('SessionService', function($http, $q, $rootScope) {

    var sessionUrl = '/sesh';

    function addSession (info) {
<<<<<<< HEAD
      $http.post(sessionUrl, info);
        // .then(function(res) {
        //   console.log(res);
        //   $rootScope.$broadcast('session:added');
=======
      return $http.post(sessionUrl, info);
        // .then(function(res) {
        //   console.log(res);
          // $rootScope.$broadcast('session:added');
>>>>>>> 7bc0a4843b9dc69402a7722d67bfe6fcdda1ef6b
        // })
    }

    function getSession () {
      var defer = $q.defer();
      $http.get(sessionUrl).then(function(data){
        defer.resolve(data);
      });
      return defer.promise;
    }

    function deleteSesh(id) {
      return $http.delete(sessionUrl + "/" + id)
        .then(function (res) {
          console.log(res, 'deleted');
        });
    }

    function editSession (session) {
        console.log('in editSession', session);
        console.log('this is the id:', session.id);
        var editUrl = sessionUrl + "/" + session.id;
        return $http.put(editUrl, session);
    }

    return {
      addSession: addSession,
      getSession: getSession,
      deleteSesh: deleteSesh,
      editSession: editSession
    };

  });
