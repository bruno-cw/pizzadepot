var http = require('http')
var url = require('url')
var fs = require('fs')
var messages = '[server]Hello World \n'
http.createServer(function (request,response) {

	var query = url.parse(request.url,true)
	if (query.pathname == '/chat/messages' && request.method == 'PUT'){
		messages = messages + '[' + query.query.id +']'+ query.query.send + '\n'
		
	}else if (query.pathname == '/chat/messages'){		
		response.writeHead(200, { 'Content-Type': 'application/json' })
		response.end(JSON.stringify({'messages' : messages}))
	}
	else if (query.pathname == '/chat'){
		 response.writeHead(200, { 'Content-Type': 'text/html' })
		 fs.createReadStream('C:\\chat\\client\\chat.htm').pipe(response);
	}
		
}).listen(process.argv[2])