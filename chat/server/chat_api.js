/**
 * http server responsible for serving the rest interface  
 */
var http = require('http');
var url = require('url');
var ip = require('./ipfier.js')
var fork = require('child_process').fork;
//TODO: connect to db
var clients = []; 							//stores client nicknames
var messages = ['[server]Hello World']; 	//stores messages
var clientform = ''		//stores clientform location

console.log("rest api loaded:",ip.getIp(),process.argv[2]);

/**
 * start the rest api
 */
http.createServer(function (request,response) {

	var query = url.parse(request.url,true)
	var path = query.pathname
	
	switch(path){
	case '/chat/messages' :

		if(request.method == 'POST'){
			//TODO: pass json in body instead of query string
			console.log(query.query.id, query.query.send)
			messages.push('[' + query.query.id +']'+ query.query.send)
			response.writeHead(200, {'content-Type': 'application/jsonp'})
			response.end();
		}
		
		else if (request.method == 'GET'){
			response.writeHead(200, {'content-Type': 'application/json'});
			//TODO: send in client information
			response.end('callback('+JSON.stringify({'messages' : messages})+')');
		}
		
		response.writeHead(400);
		response.end("400 - Bad Request");
		break;
	
	case '/':
		//TODO: api-descriptor
		response.redirect('/chat/messages')
	default :
		response.writeHead(404);
		response.end("404 - Not found");
	}
	
}).listen(process.argv[2],ip.getIp())


//call static html server:
var child = fork('./chat_static.js',[ip.getIp(),process.argv[2]]);
