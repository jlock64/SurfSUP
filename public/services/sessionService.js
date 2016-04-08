angular
  .module('surfSup')
  .service('SessionService', function($http) {
    var sessionUrl = '/sesh';
    function addSession (info) {
      return $http.post(sessionUrl, info);
    }
    return {
      addSession: addSession
    };
  });
