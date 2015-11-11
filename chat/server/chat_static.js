/**
 *  server responsible for static content</br>
 *  can be started completely in standalone fashion</br>
 *  starts at default port 8080
 *  
 *  
 *  @args 	argv[2]: rest api host</br>
 *  		argv[3]: rest api port
 */

var express = require('express');
var replaceStream = require('replacestream')
var fs = require('fs');
var app = express();

var DEFAULT_HTTP_PORT = '80'
var dir = '../client/'; //store client-side static dir

app.get('/client.js', function(req,res){
	fs.createReadStream(dir+'/client.js')
	.pipe(replaceStream('{IP_ADDRESS}:{PORT}', process.argv[2] +':'+ process.argv[3]))
	.pipe(res);
})

app.use(express.static(dir));

app.get('/', function(req,res){
	res.redirect('/chat')
})

app.get('/chat', function(req,res){
	res.redirect('/chat.html')
})


app.listen(DEFAULT_HTTP_PORT,process.argv[2], function () {

});
console.log("static server loaded:",process.argv[2],DEFAULT_HTTP_PORT);
