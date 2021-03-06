angular
  .module('surfSup')
  .service('SessionService', function($http, $q, $rootScope) {

    var sessionUrl = '/sesh';
    var allGoingToSeshUrl = '/sesh';
    var friendSeshUrl = '/user/friend/sesh';
    var joinSessionUrl = '/join';
    var coordsUrl = '/sesh';

    function addSession (info) {
      return $http.post(sessionUrl, info)
        .then(function(res) {
          console.log(res);
          $rootScope.$broadcast('session:added');
        });
    }

    function getSession () {
      var defer = $q.defer();
      $http.get(friendSeshUrl).then(function(data){
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
        var editUrl = sessionUrl;
        return $http.put(editUrl, session);
    }

    function joinSesh (id) {
      return $http.post(joinSessionUrl + '/' + id)
        .then(function (res) {
          $rootScope.$broadcast('session:joined');
          console.log('you joined this session bitch', res );

        });
    }

    function getAllGoingToSesh (id) {
      return $http.get(allGoingToSeshUrl + '/' + id)
        .then(function (res) {
          $rootScope.$broadcast('session:allGoing');

          console.log('all going to sesh in service', res);
          return res;
        });
    }
    function getCoords (id) {
      var defer = $q.defer();
      $http.get(coordsUrl + '/' + id + '/coords')
      .then(function(data) {
        defer.resolve(data);
      });
      return defer.promise;
    }

    return {
      addSession: addSession,
      getSession: getSession,
      deleteSesh: deleteSesh,
      editSession: editSession,
      joinSesh: joinSesh,
      getAllGoingToSesh: getAllGoingToSesh,
      getCoords: getCoords
    };

  });
