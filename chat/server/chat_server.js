var express = require('express');
var url = require('url');
var mysql = require('mysql2')
var app = express();

var con = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	database : 'chat'
});
con.config.namedPlaceholders = true;

app.use(express.static('../client/'));
app.get('/', function(req,res){
	res.redirect('/chat.html')
})
app.get('/chat/messages',function (req,res){
	res.setHeader('content-Type', 'application/json');
	getMessages(function(rows){
		var messages = [];
		rows.forEach(function(row){
			messages.push({username: row.username, 
						   message:  row.message})
		})
		res.send(JSON.stringify({'messages': messages}))
	})
})
app.post('/chat/messages',function (req,res){
	var query = url.parse(req.url,true).query
	insertMessage(query.id,query.message)
})
app.listen(process.argv[2]);
console.log("server loaded:",process.argv[2]);


var insertMessage = function(userId, message){
	con.execute('insert into message(message,id_user)'
			+' values (:msg ,1)', {msg: message})
}

var getMessages = function(callback){
	var rows;
	con.execute('select u.username, m.message'
			+' from message as m'
			+' inner join user as u'
			+' on m.id_user = u.iduser', 
			function(err,rows){
				callback(rows)
			})
			return rows;
}
