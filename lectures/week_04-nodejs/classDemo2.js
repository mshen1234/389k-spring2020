/*
var request=require('request');

request('http://www.google.com',function(err,response,body){
if (!err && response.statusCode==200) {
console.log(response);
}
});

*/

var http=require('http');

const PORT=8888;

function handleReq(req,res){
console.log("New request" +req.url);
res.end("Link hit: " +req.url);

}

var server=http.createServer(handleReq);

server.listen(8888,function(){
  console.log("server listening on: http",PORT);
});
