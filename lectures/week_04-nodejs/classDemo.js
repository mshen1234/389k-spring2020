var fs =require("fs");
/*node is not synchronized so will print 2 3 1 or smth */
var data=fs.readFile('input.txt',function(err,data){
  if (err) {
    return console.error(err);
  }
  console.log("1. Asynchronous read:" +data);
});

var data=fs.readFileSync('input.txt');
console.log("2"+data);
console.log("3 Program Ended");
