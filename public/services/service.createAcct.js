angular
.module ('surfSup')
.service('CreateAcctService', function ($http) {
  var createUrl = '/user';
  function addAcct(info) {
    return $http.post(createUrl, info);
  }
  return {
    addAcct: addAcct
  };
});
