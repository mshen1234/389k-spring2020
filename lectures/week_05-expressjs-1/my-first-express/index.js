var express = require('express')
var server = express();

server.get('/', function (req, res) {
res.send('Hello World!')
})


server.get('/route1',function(req,res){
  res.send('hello this is' +req.path)
})

server.listen(3000, function () {
 console.log('Server running on port 3000!')
})
