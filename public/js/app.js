var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

removeliScrollBot = function() {
	
	var $messagesli = $('.messages li');
	if ($messagesli.length > 10) {
		$messagesli.first().remove();
	}
	$('.messages').animate({
	     scrollTop: $('.messages li:last-child').position().top
	}, 'slow');
}

$('.room-title').text(room);
socket.on('connect', function() {
	console.log("Connected to server via front end");
	socket.emit('joinRoom', { // custom even to server
		name: name,
		room: room
	});
});
socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);
	var timeStamp = moment.utc(message.timestamp).local().format('h:mma');
	var $messages = jQuery('.messages');
	var $message = $('<li class="list-group-item"></li>')
	$message.append('<p><strong>' + message.name + ' '+ timeStamp +' </strong></p>');
	$message.append('<p>' + message.text+ '</p>')
	$messages.append($message);
	// mod this callback
	removeliScrollBot();
});

// handle submitting of new messages
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();
	var $msg = $form.find('input[name=message]');
	socket.emit('message', {
		name: name,
		text: $msg.val()
	});
	$msg.val('');
});

