/* App Module */

var ivodApp = angular.module("ivodApp", [
  'ui.router',
  'lyServices',
  'ivodControllers'
]);

ivodApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise("/");
    $stateProvider.
      state('position',{
      url: '/',
      data: {
        text: '全部'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.kmt',{
      url: 'kmt',
      data: {
        text: '中國國民黨'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.dpp',{
      url: 'dpp',
      data: {
        text: '民主進步黨'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.pfp',{
      url: 'pfp',
      data: {
        text: '親民黨'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.tsu',{
      url: 'tsu',
      data: {
        text: '台灣團結聯盟'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.npsu',{
      url: 'npsu',
      data: {
        text: '無黨團結聯盟'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.no-party',{
      url: 'no-party',
      data: {
        text: '無黨籍'
      },
      templateUrl: '/position/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('about',{
      url: '/',
      templateUrl: '/position/partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('sign',{
      url: 'sign',
      templateUrl: '/position/partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('data',{
      url: 'data',
      templateUrl: '/position/partials/data.html'
    }).
      state('contact',{
      url: 'contact',
      templateUrl: '/position/partials/contact.html',
      controller: 'aboutCtrl'
    }).
      state('legi',{
      url: 'legi',
      templateUrl: '/position/partials/legi.html',
      controller: 'legCtrl'
    }).
      state('legi.legId',{
      url: ':legId',
      templateUrl: '/position/partials/legi.html',
      controller: 'legCtrl'
    });



}]);
