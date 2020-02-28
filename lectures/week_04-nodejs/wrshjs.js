var http = require("http")
const PORT = 8888;

function handleReq(req, res) {
	console.log("New request at " + req.url)
	if (req.url === '/week4') {
		var ob = {
			names: ['Megan Shen'],
      foods: ['idk']
		};
		res.end(JSON.stringify(ob));
	} else {
		res.end("Link hit")
	}
}



var server = http.createServer(handleReq)

server.listen(PORT, function() {
	console.log("Server is listening on: http://localhost:" + PORT);
})
