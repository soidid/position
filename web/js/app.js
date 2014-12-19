/* App Module */

var ivodApp = angular.module("ivodApp", [
  'ui.router',
  'lyServices',
  'ivodControllers'
]);

ivodApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/position/all");
    $stateProvider.
      state('position',{
      url: '/position/all',
      data: {
        text: '全部'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.kmt',{
      url: '/position/kmt',
      data: {
        text: '中國國民黨'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.dpp',{
      url: '/position/dpp',
      data: {
        text: '民主進步黨'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.pfp',{
      url: '/position/pfp',
      data: {
        text: '親民黨'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.tsu',{
      url: '/position/tsu',
      data: {
        text: '台灣團結聯盟'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.npsu',{
      url: '/position/npsu',
      data: {
        text: '無黨團結聯盟'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.no-party',{
      url: '/position/no-party',
      data: {
        text: '無黨籍'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('about',{
      url: '/position',
      templateUrl: '/partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('sign',{
      url: '/position/sign',
      templateUrl: '/partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('data',{
      url: '/position/data',
      templateUrl: '/partials/data.html'
    }).
      state('contact',{
      url: '/position/contact',
      templateUrl: '/partials/contact.html',
      controller: 'aboutCtrl'
    }).
      state('legi',{
      url: '/position/legi',
      templateUrl: '/partials/legi.html',
      controller: 'legCtrl'
    }).
      state('legi.legId',{
      url: '/position/:legId',
      templateUrl: '/partials/legi.html',
      controller: 'legCtrl'
    });



}]);
