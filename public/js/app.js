var socket = io();

console.log("app js loaded");
socket.on('connection', function() {
	console.log("Connected to server via front end");
});

