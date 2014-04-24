var https = require('https');
var data = [];

for(var i=1;i<3;i++){
    getData(i);

}



function getData(page_num){
  var options = {
      host: 'twly.herokuapp.com',
      port: 443,
      path: '/api/legislator/?page='+page_num,
      method: 'GET'
  };

  https.request(options, function(res) {
      //console.log('STATUS: ' + res.statusCode);
      //console.log('HEADERS: ' + res.headers);
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        
        //console.log('BODY: ' + chunk);
        data[page_num] = chunk;
        display(page_num);
        
    });

  }).end();

}

function display(page_num){

   console.log(data[page_num]);

}