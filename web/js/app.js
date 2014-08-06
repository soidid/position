/* App Module */

var ivodApp = angular.module("ivodApp", [
  'ui.router',
  'lyServices',
  'ivodControllers'
]);

ivodApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider.
      state('position',{
      url: '/position',
      data: {
        text: '全部'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.kmt',{
      url: 'kmt',
      data: {
        text: '中國國民黨'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.dpp',{
      url: 'dpp',
      data: {
        text: '民主進步黨'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.pfp',{
      url: 'pfp',
      data: {
        text: '親民黨'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.tsu',{
      url: 'tsu',
      data: {
        text: '台灣團結聯盟'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.npsu',{
      url: 'npsu',
      data: {
        text: '無黨團結聯盟'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('position.no-party',{
      url: 'no-party',
      data: {
        text: '無黨籍'
      },
      templateUrl: '/partials/position.html',
      controller: 'positionCtrl'
    }).
      state('list',{
      url: '/list',
      templateUrl: '/partials/position.html',
      controller: 'listCtrl'
    }).
      state('about',{
      url: '/',
      templateUrl: '/partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('sign',{
      url: '/sign',
      templateUrl: '/partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('data',{
      url: '/data',
      templateUrl: '/partials/data.html'
    }).
      state('contact',{
      url: '/contact',
      templateUrl: '/partials/contact.html',
      controller: 'aboutCtrl'
    }).
      state('legi',{
      url: '/legi',
      templateUrl: '/partials/legi.html',
      controller: 'legCtrl'
    }).
      state('legi.legId',{
      url: '/:legId',
      templateUrl: '/partials/legi.html',
      controller: 'legCtrl'
    });



}]);
