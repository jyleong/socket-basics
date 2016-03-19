var socket = io();

socket.on('connection', function() {
	console.log("Connected to server via front end");
});
socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);
	var timeStamp = moment.utc(message.timestamp).local().format('MMM Do, h:mma');
	jQuery('.messages').append('<p><strong>'+ timeStamp + "</strong>: " + message.text+'</p>');
	// mod this callback
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