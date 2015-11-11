function getMessages(){
	$.ajax({	url:"http://{IP_ADDRESS}:{PORT}/chat/messages",
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


function clear(){
	$('#send').val('')
	$('#send').focus()
}				
function send(text, id){
	console.log($('#user').val())
	$.ajax({
		url: 'http://{IP_ADDRESS}:{PORT}/chat/messages?send='+text+'&id='+id,
		type: 'POST',
		success: function(response) {
		},
		error: function (error){
			console.log(error)
		}
	});
}			
$(document).ready(function(){
	$('#button').click(function(){
		send($('#send').val(),$('#user').val());
		clear();
	});
	$('#send').keypress(function(e){
		if(e.which == 13) {
			send($('#send').val(),$('#user').val());
			clear();
		}
	});
	//this seems kinda wrong
	window.setInterval(function(){
		getMessages();
	}, 750);
});