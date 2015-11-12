function receive(){
	$.ajax({	
		url:			'chat/messages',
		type: 			'GET',
		dataType: 		'json',
		success:		
			function(data) {
			$('#messages').empty()
			data.messages.forEach(function(data){
				$('#messages').append("<p>"+data+"</p>");
			})
		}
	});
}
function send(userid,message){
	$.ajax({
		method: "POST",
		url: "/chat/messages?id="+userid+'&message='+message
	})
	clear();
}

function clear(){
	$('#send').val('');
	$('#send').focus();
}



$(document).ready(function(){
	$('#button').click(function(e) {
		send($('#userid').val(),$('#message').val());
	})
	$('#button').keypress(function(e){
		if(e.which == 13) {
			send($('#userid').val(),$('#message').val());
		}
	});

	window.setInterval(function(){
		receive();
	}, 750);
});