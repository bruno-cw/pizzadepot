/**
 *  server responsible for static content
 *  @args: port
 */

var express = require('express');
var ip = require('./ipfier.js')
var replaceStream = require('replacestream')
var fs = require('fs');
var app = express();

var DEFAULT_HTTP_PORT = '80'
var dir = '../client/'; //store client-side static dir

app.get('/chat.html', function(req,res){
	fs.createReadStream(dir+'/chat.html')
	.pipe(replaceStream('{IP_ADDRESS}:{PORT}', process.argv[2] +':'+ process.argv[3]))//server will always start at 8080
	.pipe(res);
})

app.use(express.static(dir));

app.get('/', function(req,res){
	res.redirect('/chat')
})

app.get('/chat', function(req,res){
	res.redirect('/chat.html')
})


app.listen(DEFAULT_HTTP_PORT, function () {

});
console.log("static server loaded:",process.argv[2],DEFAULT_HTTP_PORT);
