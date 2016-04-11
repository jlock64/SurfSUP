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

    function deleteSesh(id) {
      return $http.delete(sessionUrl + "/" + id)
        .then(function (res) {
          console.log(res, 'deleted');
        });
    }

    function editSession (id,location) {
      var editedSession = {id: id};
      console.log('test',new Date(location).getDay());
        if(new Date(location).getDay()) {
          editedSession.time = location;
        } else {
          editedSession.location = location
        }
        console.log('in editSession', editedSession);
        console.log('this is the id:', id);
        var editUrl = sessionUrl + "/" + id;
        return $http.put(editUrl, editedSession);
    }

    return {
      addSession: addSession,
      getSession: getSession,
      deleteSesh: deleteSesh,
      editSession: editSession
    };

  });
