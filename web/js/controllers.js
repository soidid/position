
var ivodControllers = angular.module('ivodControllers',[]);

ivodControllers.controller('indexCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $scope.legislators=[];
    $http.get('data/final.json').success(function(data) {
      //console.log(data);
      $scope.legislators = data;
      for(var i=0;i<data.length;i++){
         $scope.legislators[i]['id'] = i;
      }
      $scope.data = $scope.legislators[37];//default, can modify to random
      
    });


    $scope.sesame = false;
    $scope.sesameToggle = function(){
       $scope.sesame =!$scope.sesame;
    };
    $scope.legClick = function(id){
      $scope.data = $scope.legislators[id];
       //$("#alert_box").show();
    };
    $scope.hide = function(){
      $("#alert_box").hide();

    };


    //keep top info segment fixed on top
    $scope.nav = $("#nav_segment");
    $(window).scroll(function () {
      //console.log($(this).scrollTop());

        console.log($(this).scrollTop())
        if ($(this).scrollTop() > 68) {
          $scope.nav.addClass("f-nav");
          $scope.nav.removeClass("f-fix");
        } else {
          $scope.nav.removeClass("f-nav");
          $scope.nav.addClass("f-fix");
        }
    });
  



  }
]);

