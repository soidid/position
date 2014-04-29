var ivodControllers = angular.module('ivodControllers',[]);

ivodControllers.controller('indexCtrl', ['$scope', 'lyData','$http',
  function ($scope,lyData, $http) {

    
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
          }
          
          $scope.data = $scope.legislators[37];//default, can modify to random
    
        });
    }

    $scope.categories = ['for','against'];
    $scope.parties = ['全部','中國國民黨','民主進步黨','親民黨','台灣團結聯盟','無黨團結聯盟','無黨籍'];

    $scope.mode = "position";//figure/list/blue/position/party
    $scope.toggleMode = function(mode){
      $scope.mode = mode;
      $scope.setMargin();

    };
    $scope.showContact = true;
    $scope.toggleContact = function(){
        $scope.showContact = !$scope.showContact;
    };
    $scope.party = "";
    $scope.party_text = "全部";
    $scope.chooseParty = function(party){

        $scope.party = party;
        $scope.party_text = party;
        if(party=="全部")
           $scope.party="";
    };
    $scope.legClick = function(id){
      $scope.data = {};
      $scope.data = $scope.legislators[id];
      
    };
   
    $scope.goback = function(){
      var body = $("html, body");
      body.animate({scrollTop:0}, '500', 'swing');

    };



    //keep top info segment fixed on top
    $scope.nav = $("#nav_segment");
    $(window).scroll(function () {

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


ivodControllers.controller('aboutCtrl', ['$scope', 'lyData','$http',
  function ($scope,lyData, $http) {

    $scope.groups = [];
    console.log("g");
    if($scope.groups.length==0){
       lyData.getGroup().then(function(data){
            console.log("group");
            $scope.groups = data;
            
   
       });
    }
    $scope.goback = function(){
      var body = $("html, body");
      body.animate({scrollTop:0}, '500', 'swing');

    };
    $scope.contact = function(){
      $("#alert_box").show();
    };
    $scope.hide = function(){
      $("#alert_box").hide();
    };

  }
]);   

ivodControllers.controller('navCtrl', ['$scope',
  function ($scope) {
     
     $scope.nav_cat = "index";

     $scope.toggleNav = function(choice){

        $scope.nav_cat = choice;

     };

  }
]); 