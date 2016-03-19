var socket = io();

socket.on('connection', function() {
	console.log("Connected to server via front end");
});
socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);
});

socket.emit('message', {
	text: "seen from a browser"
});

// handle submitting of new messages
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();
	var msg = $form.find('input[name=message]');
	socket.emit('message', {
		text: msg.val()
	});
	msg.val('');
});