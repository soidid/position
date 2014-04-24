
var ivodControllers = angular.module('ivodControllers',[]);

ivodControllers.controller('indexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.legislators=[];
    $http.get('data/new.json').success(function(data) {
      //console.log(data);
      $scope.legislators = data;
      for(var i=0;i<data.length;i++){
         $scope.legislators[i]['id'] = i;
      }
      
    });

    $scope.sesame = false;
    $scope.sesameToggle = function(){
       $scope.sesame =!$scope.sesame;
    };
    $scope.legClick = function(id){
      $scope.data = $scope.legislators[id];
     
      $("#alert_box").show();

    };
    $scope.hide = function(){
      $("#alert_box").hide();

    };
  
  }

]);

