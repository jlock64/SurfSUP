angular
  .module('surfSup')
  .service('SessionService', function($http, $q, $rootScope) {

    var sessionUrl = '/sesh';

    function addSession (info) {

      return $http.post(sessionUrl, info)
        .then(function(res) {
          console.log(res);
          $rootScope.$broadcast('session:added');
        });
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
          $rootScope.$broadcast('session:deleted');
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
