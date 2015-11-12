var express = require('express');
var url = require('url');

var messages = ['[server]Hello World']; 
var app = express();
var dir = '../client/';

app.use(express.static(dir));
app.get('/', function(req,res){
	res.redirect('/chat')
})

app.get('/chat', function(req,res){
	res.redirect('/chat.html')
})

app.get('/chat/messages',function (request,response){
	response.setHeader('content-Type', 'application/json');
	response.send(JSON.stringify({'messages' : messages}));
})
app.post('/chat/messages',function (request,response){
	var query = url.parse(request.url,true).query
	console.log(query)
	messages.push('[' + query.id +']'+ query.message)
	response.send();
})

app.listen(process.argv[2], function () {

});
console.log("server loaded:",process.argv[2]);
