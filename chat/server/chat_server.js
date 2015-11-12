var express = require('express');
var fs = require('fs');
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
	var query = url.parse(request.url,true)
	var path = query.pathname
	console.log(query.query.id, query.query.send)
	messages.push('[' + query.query.id +']'+ query.query.send)
	response.end();
})

app.listen(process.argv[2], function () {

});
console.log("server loaded:",process.argv[2]);
