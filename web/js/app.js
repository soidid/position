/* App Module */

var ivodApp = angular.module("ivodApp", [
  'ui.router',
  'lyServices',
  'ivodControllers'
]);

ivodApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider.
      state('index',{
      url: '/',
      data: {
        text: '全部'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('index.kmt',{
      url: 'kmt',
      data: {
        text: '中國國民黨'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('index.dpp',{
      url: 'dpp',
      data: {
        text: '民主進步黨'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('index.pfp',{
      url: 'pfp',
      data: {
        text: '親民黨'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('index.tsu',{
      url: 'tsu',
      data: {
        text: '台灣團結聯盟'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('index.npsu',{
      url: 'npsu',
      data: {
        text: '無黨團結聯盟'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('index.no-party',{
      url: 'no-party',
      data: {
        text: '無黨籍'
      },
      templateUrl: 'partials/index.html',
      controller: 'indexCtrl'
    }).
      state('list',{
      url: '/list',
      templateUrl: 'partials/list.html',
      controller: 'listCtrl'
    }).
      state('about',{
      url: '/about',
      templateUrl: 'partials/about.html',
      controller: 'aboutCtrl'
    }).
      state('data',{
      url: '/data',
      templateUrl: 'partials/data.html'
    }).
      state('contact',{
      url: '/contact',
      templateUrl: 'partials/contact.html'
    }).
      state('legi',{
      url: '/legi',
      templateUrl: 'partials/legi.html',
      controller: 'legCtrl'
    }).
      state('legi.legId',{
      url: '/:legId',
      templateUrl: 'partials/legi.html',
      controller: 'legCtrl'
    });
    


}]);


