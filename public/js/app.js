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