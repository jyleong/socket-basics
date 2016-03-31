var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
//var now = moment();

app.use(express.static(__dirname + '/public'));

//ENABLE CORS
app.all('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next()
});

var clientInfo = {};

// sends current users to provided socket
function sendCurrentUsers(socket) {
	var Info = clientInfo[socket.id]; // client info pulled in
	var users = [];

	if (typeof Info == 'undefined') {return;}
	// search throught clientInfo object
	Object.keys(clientInfo).forEach(function(socketId) {
		var userinfo = clientInfo[socketId];
		if (Info.room === userinfo.room) { // if those clients are in same room
			users.push(userinfo.name);
		}
	});
	socket.emit('message', {
		name: 'System',
		text: 'Current users: ' + users.join(', '),
		timestamp: moment().valueOf()
	});
};

io.on('connection',function(socket) {
	console.log("User connected via socket.io!");
	socket.on('joinRoom', function(req) {

		clientInfo[socket.id] = req;
		// for when someones joins a room
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined',
			timestamp: moment().valueOf()
		});
	});

	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id];

		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + " has left",
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id];
		}
	});

	socket.on('message', function(message) {
		
		console.log('Message received ' + message.text);

		if(message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		}
		else {
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', message);
		}
	});
	// both would have timestamp property - JavaScript timestamp in millis
	socket.emit('message', {
		name: 'System',
		text: "Welcome to the chat application",
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function() {
	console.log("server started");
});

