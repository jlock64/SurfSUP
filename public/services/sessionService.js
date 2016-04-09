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
    return {
      addSession: addSession,
      getSession: getSession
    };

  });
