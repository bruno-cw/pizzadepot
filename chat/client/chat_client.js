function receive(){
	$.ajax({	
		url:			'chat/messages',
		type: 			'GET',
		dataType: 		'json',
		success:		
			function(data) {
			$('#messages').empty()
			data.messages.forEach(function(message){
				$('#messages').append("<p>["+message.username+"] "+message.message+"</p>");
			})
		}
	});
}

function send(userid,message){
	$.ajax({
		method: "POST",
		url: "/chat/messages",
		data : JSON.stringify({'id' : userid, 'message' : message}),
		dataType: 'json',
	})
	clear();
}

function clear(){
	$('#message').val('');
	$('#message').focus();
}

$(document).ready(function(){
	$('#button').click(function(e) {
		send($('#userid').val(),$('#message').val());
	})
	$('#message').keypress(function(e){
		if(e.which == 13) {
			send($('#userid').val(),$('#message').val());
		}
	});
	var connection = new WebSocket('ws://localhost:8080/chat/messages');
	connection.onmessage = function(e){
		var server_message = e.data;
		console.log(server_message);
	}
	connection.onopen = function(){
		console.log('Connection open!');
		connection.send('Hey server, whats up?');
	}
});