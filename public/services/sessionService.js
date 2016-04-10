angular
  .module('surfSup')
  .service('SessionService', function($http, $q) {

    var sessionUrl = '/sesh';

    function addSession (info) {
      return $http.post(sessionUrl, info);
    }

    function getSession () {
      var defer = $q.defer();
      $http.get(sessionUrl).then(function(data){
        defer.resolve(data);
      });
      return defer.promise;
    }

    function deleteSession(id) {
      return $http.delete(sessionUrl + "/" + id)
        .then(function (res) {
          console.log('${res} deleted');
        })
    }

    function editSession (editedSession) {
      return $http.put(sessionUrl + "/" + editedSession._id, editedSession)
        .then (function (res) {
          console.log(('${res} editedSession'));
        })
    }

    return {
      addSession: addSession,
      getSession: getSession,
      deleteSession: deleteSession,
      editSession: editSession
    };

  });
