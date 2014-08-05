/* App Module */

var ivodApp = angular.module("ivodApp", [
  'ngRoute',
  'lyServices',
  'ivodControllers'

]);

ivodApp.config(['$routeProvider','$locationProvider',
  function($routeProvider,$locationProvider){
    $routeProvider.
      when('/',{
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      when('/list',{
      templateUrl: 'partials/list.html',
      controller: 'listCtrl'
    }).
      when('/about',{
      templateUrl: 'partials/about.html',
      controller: 'aboutCtrl'
    }).
      when('/data',{
      templateUrl: 'partials/data.html'
    }).
      when('/contact',{
      templateUrl: 'partials/contact.html'
    }).
      otherwise({
      redirectTo:'/',
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    });
    $locationProvider.html5Mode(true)
                     .hashPrefix('!');

}]);


