angular
  .module('surfSup')
  .service('SessionService', function($http, $q, $rootScope) {

    var sessionUrl = '/sesh';

    function addSession (info) {
      $http.post(sessionUrl, info);
        // .then(function(res) {
        //   console.log(res);
        //   $rootScope.$broadcast('session:added');
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
      // var editedSession = {id: id};
      // console.log('test',new Date(location).getDay());
        // if(new Date(location).getDay()) {
        //   session.time = location;
        // } else {
        //   session.location = location
        // }
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
