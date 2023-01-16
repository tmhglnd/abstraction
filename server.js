// require dependencies for server
const express = require('express');
const max = require('max-api-or-not');
const socket = require('socket.io');
const shell = require('child_process');
const rpi = require('detect-rpi');

// init the app server and port listen
const app = express();
app.use(express.static('.'));

const port = 3000;
const server = app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
	
	if (rpi()){
		// hide mouse when not moving
		shell.exec(`unclutter -idle 1`);
		// open browser in fullscreen incognito when on rpi
		shell.exec(`chromium-browser --start-fullscreen --start-maximized --incognito http://localhost:${port}`);
	}
});

// connect via socket io
const io = socket(server);

// post socket id to max console
io.sockets.on('connection', function(socket){
	console.log(`Connected ${socket.id}`);

	// initialize all visuals
	init = {
		'/control1/function' : 1024/5,
		'/control2/function' : 1024/5*3,
		'/control1/switch' : 1,
		'/control2/switch' : 1,
		'/control1/value' : Math.random()*1024,
		'/control2/value' : Math.random()*1024,
	}
	for (i in init){
		io.emit('message', i, init[i]);
	}
});

// require dependency for receiving controller values
const { Server } = require('node-osc');

const oscPort = 9999;

// setup a server to receive OSC messages from controllers
let osc = new Server(oscPort, '0.0.0.0', () => {
	console.log(`OSC server listening at port ${oscPort}`);
	
	// receive messages and forward to the browser
	osc.on('message', (msg) => {
		io.emit('message', ...msg);
	});
});

// send all parameters from Max (for testing purposes)
max.addHandler('message', (...v) => {
	io.emit('message', ...v);
});