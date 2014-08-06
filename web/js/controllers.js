(function(){
var ivodControllers = angular.module('ivodControllers',[
  'ui.router'
]);


ivodControllers.controller('positionCtrl', ['$state','$location','$scope', 'lyData','$http',
  function ($state,$location,$scope,lyData, $http) {
    console.log("positionCtrl");

    $scope.setMargin = function(){
       console.log("SET MARGIN");
       var nav_height = $("#nav_segment").css("height");
       if(nav_height){
          nav_height = parseInt(nav_height.split("px")[0]) + 10 + "px";
          $("#main_content").css("margin-top",nav_height);
       }
    };


    $( window ).resize(function() {
       //console.log($( window ).width());
       $scope.setMargin();
    });

    $scope.legislators = [];
    if($scope.legislators.length==0){
        lyData.getData().then(function(data){

          $scope.legislators = data;
          for(var i=0;i<$scope.legislators.length;i++){
             $scope.legislators[i]['id'] = i;
             //console.log($scope.legislators[i]['name']);
          }

          //$scope.data = $scope.legislators[37];//default, can modify to random

        });
    }

    $scope.categories = ['for','pending','against'];
    $scope.parties = [
      'position', 'position.kmt','position.dpp','position.pfp','position.tsu','position.npsu','position.no-party'
      ];

    $scope.$state = $state;

    $scope.showContact = true;
    $scope.toggleContact = function(){
        $scope.showContact = !$scope.showContact;
    };

    $scope.legClick = function(id){
      $scope.data = {};
      $scope.data = $scope.legislators[id];
      $scope.currentActiveLeg = id;

    };
    $scope.isActiveLeg = function(id){
      return $scope.currentActiveLeg === id;
    }

    $scope.goback = function(){
      var body = $("html, body");
      body.animate({scrollTop:0}, '500', 'swing');

    };




    //keep top info segment fixed on top
    /*
    $scope.nav = $("#nav_segment");
    $(window).scroll(function () {

        if ($(this).scrollTop() > 38) {
          $scope.nav.addClass("f-nav");
          $scope.nav.removeClass("f-fix");
        } else {
          $scope.nav.removeClass("f-nav");
          $scope.nav.addClass("f-fix");
        }
    });
    */



    //Determin if it's at the bottom of the page
    //http://stackoverflow.com/questions/3898130/how-to-check-if-a-user-has-scrolled-to-the-bottom

    $(window).scroll(function() {

       //console.log("petition component: "+$("#petition_component").height());
       // bottom_height = $("#petition_component").height() + 100;
       var bottom_height = 100;
       if($(window).scrollTop() + $(window).height() > $(document).height() - bottom_height) {
           $("#bottom_search").removeClass("nav_fixed");
           $("#bottom_join").removeClass("nav_fixed");
           $("#bottom_join").removeClass("join_button_area_top");

       }else{
           $("#bottom_search").addClass("nav_fixed");
           $("#bottom_join").addClass("nav_fixed");
           $("#bottom_join").addClass("join_button_area_top");
       }
    });

    $scope.goLegi = function(url){
        $location.path("legi/"+url);
    };





  }
]);
ivodControllers.controller('legCtrl', ['$state','$scope', 'lyData',
  function ($state,$scope,lyData) {
    if($state.params.legId){
      $scope.legId = +$state.params.legId;
    }else{
      $scope.legId = 1;
    };

    $scope.legislators = [];
    if($scope.legislators.length==0){
        lyData.getData().then(function(data){

          $scope.legislators = data;
          for(var i=0;i<$scope.legislators.length;i++){
             $scope.legislators[i]['id'] = i;
          }
          $scope.data = $scope.legislators[$scope.legId];

        });
    }



  }
]);
ivodControllers.controller('listCtrl', ['$scope', 'lyData','$http',
  function ($scope,lyData, $http) {
    $scope.signers = [];
    if($scope.signers.length==0){
         lyData.getData().then(function(data){

          $scope.signers = data;



        });
    }



  }
]);
ivodControllers.controller('footCtrl', ['$location','$scope',
  function ($location,$scope) {
    $scope.go = function(url){
        $location.path(url);
    };
    $scope.goExternal = function(url){
        window.open(url);
    };

  }
]);

ivodControllers.controller('aboutCtrl', ['$location', '$scope', 'lyData','$http', '$state',
  function ($location, $scope, lyData, $http, $state) {
    //console.log("aboutCtrl:"+$location.path());
    if($location.path() !=='/sign') {
      $(document.body).animate({scrollTop: 0 }, 500, 'swing');
    }
    $scope.groups = [];

    if($scope.groups.length==0){
       lyData.getGroup().then(function(data){
            console.log("group");
            $scope.groups = data;

       });
    }
    $scope.goback = function(){
      var body = $("html, body");
      body.animate({scrollTop:0}, 500, 'swing');

    };
    $scope.showBox = function(){
      $("#alert_box").show();
    };
    $scope.hideBox = function(){
      $("#alert_box").hide();
    };

    $('.ui.checkbox').checkbox();
    $scope.show = $('input[name=show]:checked').length;
    $scope.user = {};
    $scope.submit = function(){
       console.log($scope.user.name);
       console.log($scope.user.email);
       console.log($scope.show);
    };

    $scope.go = function(url){
        $location.path(url);
    };

    //console.log("$location.path(): "+$location.path());
    if($location.path()==='/sign'){
      var body = $("html, body");
      var target = $("#petition_component").offset().top - 50;

      //console.log("$location.path()==='/sign'");
      body.animate({scrollTop:target}, 500, 'swing');

    }

  }
]);

ivodControllers.controller('navCtrl', ['$scope', '$state',
  function ($scope, $state) {
     $scope.$state = $state;
     $scope.goPetition = function(){


     var body = $("html, body");
     var target = $("#petition_component").offset().top - 50;

     //console.log("goPetition:"+target);
     body.animate({scrollTop:target}, 1000, 'swing');




     };
  }

]);

ivodControllers.filter('byParty', ['$state', '$filter', function ($state, $filter) {
  return function (input) {
    if ($state.current.name == 'position') return input;
    return $filter('filter')(input, {'party': $state.current.data.text});
  }
}]);
}).call(this);
