// require dependencies for server
const express = require('express');
const max = require('max-api-or-not');
const socket = require('socket.io');
const open = require('open');

// init the app server and port listen
const app = express();
app.use(express.static('.'));

const port = 3000;
const server = app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
	// start the browser with the site
	// open(`http://localhost:${port}`, { app: { name: 'google chrome', arguments: ['--incognito'] } });
});

// connect via socket io
const io = socket(server);

// post socket id to max console
io.sockets.on('connection', function(socket){
	console.log(`Connected ${socket.id}`);
});

// require dependency for receiving controller values
const { Server } = require('node-osc');

const oscPort = 9999;

// setup a server to receive OSC messages from controllers
let osc = new Server(oscPort, '0.0.0.0', () => {
	console.log(`OSC server listening at port ${oscPort}`);
});

// receive messages and forward to the site
osc.on('message', (msg) => {
	console.log('received:', ...msg);
});

// send all parameters from Max (for testing purposes)
max.addHandler('message', (...v) => {
	io.emit('message', ...v);
});