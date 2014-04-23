/* App Module */

var ivodApp = angular.module("ivodApp", [
  'ngRoute',
  'ivodControllers'
]);

ivodApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider){
    $routeProvider.
      when('/',{
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      otherwise({
      redirectTo:'/',
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    });
    $locationProvider.html5Mode(false);
    //$locationProvider.html5Mode(false);
    //                .hashPrefix('!');

}]);


