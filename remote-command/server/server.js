var exec = require('child_process').exec;
var records = [];

exec('dir \\', function (error, stdout, stderr) {
	parseOutput(stdout)
	if (error !== null) {
		console.log('exec error: ' + error);
	}
},'utf8');

var http = require('http');
var url = require('url');

http.createServer(function (request,response) {

	var query = url.parse(request.url,true)
	var path = query.pathname
	if(request.method == 'GET'){
		response.writeHead(200, {'content-Type': 'application/jsonp'});
		response.end('angular.callbacks._0('+JSON.stringify({'records' : records})+')');
	}


	}).listen(process.argv[2])

	var parseOutput = function(out){
		var list = out.split('\r\n')
		list = list.splice(5, list.length-8)
		list.forEach(function(line){

			var record = {
					'Date':line.substring(0,10),
					'Hour':line.substring(12,17),
					'Type':line.substring(21,26),
					'Bytes':line.substring(30,35),
					'Name': line.substring(36,line.length),
			}
			console.log(record)
			records.push(record)
		})
	}