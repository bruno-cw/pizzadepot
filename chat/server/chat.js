var http = require('http');
var url = require('url');
var fs = require('fs');
var ip = require('./ipfier.js')
var replaceStream = require('replacestream')

var clients = []; 							//stores client nicknames
var messages = ['[server]Hello World']; 	//stores messages

console.log(ip.getIp(),process.argv[2]);

/**
 * creates an http server responsible for serving static html content
 * and rest interface  
 */
http.createServer(function (request,response) {

	var path = (url.parse(request.url,true)).pathname
	
	switch(path){
	case '/chat/messages' :
		
		if(request.method == 'POST'){
			console.log(query.query.id, query.query.send)
			messages.push('[' + query.query.id +']'+ query.query.send)
			response.writeHead(200, {'content-Type': 'application/json'});
			response.end();
		}
		if (request.method == 'GET'){
			response.writeHead(200, {'content-Type': 'application/json'});
			response.end(JSON.stringify({'messages' : messages}));
		}
		response.writeHead(400);
		response.end("400 - Bad Request");
		break;
		
	case '/chat' :
	case '/' :
		response.writeHead(200, {'content-Type': 'text/html'});
		fs.createReadStream('../client/chat.htm' )
		.pipe(replaceStream('{IP_ADDRESS}:{PORT}', ip.getIp() +':'+process.argv[2]))
		.pipe(response);
		break;
		
	default :
		response.writeHead(404);
		response.end("404 - Not found");
	}
}).listen(process.argv[2])