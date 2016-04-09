angular
.module('surfSup')
.service ('CacheEngine', function($cacheFactory){
  return $cacheFactory('sessionsAPI');
});
