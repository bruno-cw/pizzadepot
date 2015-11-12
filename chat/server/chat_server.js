var express = require('express');
var url = require('url');

var messages = ['[server]Hello World']; 
var app = express();

app.use(express.static('../client/'));
app.get('/', function(req,res){
	res.redirect('/chat')
})
app.get('/chat', function(req,res){
	res.redirect('/chat.html')
})
app.get('/chat/messages',function (req,res){
	res.setHeader('content-Type', 'application/json');
	res.send(JSON.stringify({'messages' : messages}));
})
app.post('/chat/messages',function (req,res){
	var query = url.parse(request.url,true).query
	messages.push('[' + query.id +']'+ query.message)
	res.send();
})
app.listen(process.argv[2]);
console.log("server loaded:",process.argv[2]);
