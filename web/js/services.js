var lyServices = angular.module('lyServices', ['ngResource']);
 
lyServices.factory('lyData', ['$resource',
  function($resource){
    return $resource('data/info.json', {}, {
      get: {method:'GET', isArray:true}
    });
  }]);