// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
//   });
//   socket.on('disconnect', () => {
//     console.log('a user disconnected');
//   });
// });

// module.exports = { passport };



// import openSocket from 'socket.io-client';
// const socket = openSocket('http://localhost:1338');

// function subscribeToTimer(cb) {
//   socket.on('timer', timestamp => cb(null, timestamp));
//   socket.emit('subscribeToTimer', 1000);
// }
// export { subscribeToTimer };



// const io = require('socket.io-client');
// const socket = io.connect('http://localhost:1338');

// socket.on('error', function(err) {
//   console.log('socket err: ', err);
// });


// module.exports = {
//   chatSocket: () => {


//   },


//   subscribeToTimer: (cb) => {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 1000);
//   }




// }