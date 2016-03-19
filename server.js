var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var now = moment();

app.use(express.static(__dirname + '/public'));

io.on('connection',function(socket) {
	console.log("User connected via socket.io!");
	socket.on('message', function(message) {
		
		message.timestamp = now.valueOf();
		console.log('Message received ' + message.text);
		io.emit('message', message);
	});
	// both would have timestamp property - JavaScript timestamp in millis
	socket.emit('message', {
		text: "Welcome to the chat application",
		timestamp: now.valueOf()
	});
});

http.listen(PORT, function() {
	console.log("server started");
});

