var file1 = "data/mly-8.json";
var fs1 = require('fs');
var file2 = "data/ly.json";
var fs2 = require('fs');

fs1.readFile(file1, 'utf8', function (err, data1) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  fs2.readFile(file2, 'utf8', function (err, data2) {
      if (err) {
        console.log('Error: ' + err);
        return;
      }
      data1 = JSON.parse(data1);
      data2 = JSON.parse(data2);
      processFile(data1,data2);

  });
});

function processFile(data1,data2) {

  for (var item in data1) {
    var name = data1[item]['name'];
    var peer_index = findPeer(data2,name);
    if(peer_index != -1){
         data1[item]['state'] = data2[peer_index]['state'];
         //data1[item]['id'] = data2[peer_index]['id'];
         data1[item]['district'] = data2[peer_index]['district'];
         data1[item]['districtDetail'] = data2[peer_index]['districtDetail'];
         data1[item]['partyEng'] = data1[item]['party'];
         data1[item]['party'] = data2[peer_index]['party'];
         data1[item]['twlyurl'] = data2[peer_index]['twlyurl'];
         data1[item]['eleDistrict'] = data2[peer_index]['eleDistrict'];
         //console.log(data1[item]);

    }else{
        console.log("!!NO MATCH:"+name);
    }

  }
  console.log(data1[0]);
  fs1.writeFile('data/new.json', JSON.stringify(data1), function (err) {
     if (err) throw err;
     console.log('It\'s saved.');
  });


}
function findPeer(data,leg_name) {
  for (var item in data) {
    //console.log(JSON.stringify(data[item]['name']));
    if(data[item]['name']==leg_name){
         //console.log(data[item]['name']);
         //console.log(item);
         return item;
    }
  }
  return -1;
}



