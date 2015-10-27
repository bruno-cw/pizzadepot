var http = require('http');
var url = require('url');
var fs = require('fs');
var ip = require('./ipfier.js')
var replaceStream = require('replacestream')


var clients = [];
var messages = ['[server]Hello World \n']; 

console.log(ip.getIp(),process.argv[2]);

http.createServer(function (request,response) {
	
	var query = url.parse(request.url,true)
	if (query.pathname == '/chat/messages' && request.method == 'PUT'){
		messages.push('[' + query.query.id +']'+ query.query.send + '\n')
		response.writeHead(200);
		response.end();
		
	}else if (query.pathname == '/chat/messages'){		
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify({'messages' : messages}));
	}
	else if (query.pathname == '/chat'){
		response.writeHead(200, { 'Content-Type': 'text/html' });

		fs.createReadStream('../client/chat.htm' )
		.pipe(replaceStream('{IP_ADDRESS}:{PORT}', ip.getIp() +':'+process.argv[2]))
		.pipe(response);
	}

}).listen(process.argv[2])