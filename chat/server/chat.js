var http = require('http');
var url = require('url');
var fs = require('fs');
var os = require('os');
var replaceStream = require('replacestream')
var ip = '';
var messages = '[' + new Date().toString() +']' + '[server]Hello World \n';

Object.keys(os.networkInterfaces()).forEach(function (ifname) {
	var alias = 0;

	os.networkInterfaces()[ifname].forEach(function (iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			return;
		}
		console.log(ifname, iface.address);
		ip = iface.address;
		++alias;
	});
});

http.createServer(function (request,response) {

	var query = url.parse(request.url,true)
	if (query.pathname == '/chat/messages' && request.method == 'PUT'){
		messages = messages + '[' + new Date().toString() +']' + '[' + query.query.id +']'+ query.query.send + '\n'

	}else if (query.pathname == '/chat/messages'){		
		response.writeHead(200, { 'Content-Type': 'application/json' })
		response.end(JSON.stringify({'messages' : messages}))
	}
	else if (query.pathname == '/chat'){
		response.writeHead(200, { 'Content-Type': 'text/html' })

		fs.createReadStream('..\\client\\chat.htm' ).pipe(replaceStream('{IP_ADDRESS}:{PORT}', ip+':'+process.argv[2])).pipe(response);
	}

}).listen(process.argv[2])