var express = require('express');
var mysql = require('mysql2')
var bodyParser = require('body-parser')
var app = express();
var expressWs = require('express-ws')(app);

var con = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	database : 'chat'
});
con.config.namedPlaceholders = true;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('../client/'));

app.get('/', function(req,res){			res.redirect('/chat.html')})
app.get('/users',function (req,res){	res.redirect('/register.html')})

app.ws('/chat/messages', function(ws, req) {
	ws.on('message', function(msg) {
		getMessages(function(rows){
			var messages = [];
			rows.forEach(function(row){
				messages.push({username: row.username, 
					message:  row.message})
				})
			ws.send(JSON.stringify({'messages': messages}))
		})
	})
})

app.post('/chat/messages',function (req,res){
	insertMessage(req.body.id,req.body.message)
})
app.post('/chat/users',function (req,res){
	var query = url.parse(req.url,true).query
	insertUser(query.username,query.password)
})

app.listen(process.argv[2]);

console.log("server loaded:",process.argv[2]);


//db functions//

var insertUser = function(username, password, callback){}

var insertMessage = function(username, message){

	con.execute('insert into message(message,id_user)'
			+' values (:msg ,:user)', {msg: message, user: username}, 
			function(err,rows){
				if (err) console.log(err);
			})
}

var getMessages = function(callback){
	var rows;
	con.execute('select u.username, m.message'
			+' from message as m'
			+' inner join user as u'
			+' on m.username = u.username', 

			function(err,rows){
				callback(rows)
			})
			return rows;
}
