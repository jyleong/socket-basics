var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + " joined " + room);
socket.on('connection', function() {
	console.log("Connected to server via front end");
});
socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);
	var timeStamp = moment.utc(message.timestamp).local().format('h:mma');
	var $message = jQuery('.messages');
	$message.append('<p><strong>' + message.name + ' '+ timeStamp +' </strong></p>');
	$message.append('<p>' + message.text+ '</p>')
	// mod this callback
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