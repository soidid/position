var lyServices = angular.module('lyServices', []);

lyServices.factory('lyData', ['$http','$q',function($http, $q){
    var info_url = "data/ly-info.json";
    var position_url = "data/ly-position.json";
    var group_url = "data/group.json";
    var data = [];
    iso3166tw = {
    "CHA": "彰化縣",
    "CYI": "嘉義市",
    "CYQ": "嘉義縣",
    "HSQ": "新竹縣",
    "HSZ": "新竹市",
    "HUA": "花蓮縣",
    "ILA": "宜蘭縣",
    "KEE": "基隆市",
    "KHH": "高雄市",
    "KHQ": "高雄市",
    "MIA": "苗栗縣",
    "NAN": "南投縣",
    "PEN": "澎湖縣",
    "PIF": "屏東縣",
    "TAO": "桃園縣",
    "TNN": "台南市",
    "TNQ": "台南市",
    "TPE": "台北市",
    "TPQ": "新北市",
    "TTT": "台東縣",
    "TXG": "台中市",
    "TXQ": "台中市",
    "YUN": "雲林縣",
    "JME": "金門縣",
    "LJF": "連江縣"
    }
    var constituency_parser = function (constituency) {
    switch (constituency[0]) {
    case 'proportional':
        return '全國不分區';
        break;
    case 'aborigine':
        return '山地原住民';
        break;
    case 'foreign':
        return '僑居國外國民';
        break;
    default:
        if (constituency[0] in iso3166tw) {
            if (constituency[1] == 0) {
                result = iso3166tw[constituency[0]];
            } else {
                result = iso3166tw[constituency[0]] + '第' + constituency[1] + '選區';
            }
        } else {
            result = constituency[0] + '<br>' + constituency[1];
        }
        return result;
        break;
    }
    };
    var party_parser = function (party) {
    switch (party) {
    case 'KMT':
        return '中國國民黨';
        break;
    case 'DPP':
        return '民主進步黨';
        break;
    case 'TSU':
        return '台灣團結聯盟';
        break;
    case 'PFP':
        return '親民黨';
        break;
    case 'NSU':
        return '無黨團結聯盟';
        break;
    default:
        if (party === null){
            return '無黨籍';
        }else{
            return '不明';
        }
        break;
    }
    };
    function find_peer(data,leg_name) {
      for (var index in data) {
        if(data[index]['name']==leg_name){
             return index;
        }
      }
      return -1;
    };
    function parse(info_data,position_data){
        data = [];
        
        $.each(info_data, function (key, val) {
            var new_item = {};
            var peer_index = key;
            if(val['name'] != position_data[key]['name']){
                //console.log(val['name']+" <> "+position_data[key]['name']);
                //console.log("! not match");
                peer_index = find_peer(position_data,val['name']);
                //console.log(val['name']+" <> "+position_data[peer_index]['name']);
            }
            
            new_item['name'] = val['name'];
            new_item['party'] = val['party'];//chinese
            new_item['party_eng'] = val['partyEng'];//chinese
            new_item['caucus'] = val['caucus'];//eng
            new_item['constituency'] = constituency_parser(val['constituency']);
            new_item['contact'] = val['contact'];
            new_item['avatar'] = val['avatar'];
            new_item['constituency_detail'] = val['constituency_detail'];
            new_item['position'] = position_data[peer_index]['position'];
            data.push(new_item);
            
        });
        //console.log(data);
        return data;
    };
	var getData = function() {
		
        var deferred = $q.defer();
        $http({method:"GET", url:info_url}).success(function(info_data){
        	$http({method:"GET", url:position_url}).success(function(position_data){
                   deferred.resolve(parse(info_data,position_data));
            });
        });
        return deferred.promise;
        
    };
    var getGroup = function(){
        var deferred = $q.defer();
        $http({method:"GET", url:group_url}).success(function(group_data){
            console.log("success");
            deferred.resolve(group_data);

        });
        return deferred.promise;

    };
    return { getData: getData, getGroup:getGroup };
    

 }]);