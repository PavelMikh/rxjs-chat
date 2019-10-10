let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

  console.log('user connected');
  var messageWrapper = {};
  socket.on('new-nickname', (nickname) => {
    socket.username = nickname;
    messageWrapper ['name'] = socket.username;
  });
  socket.on('new-message', (message) => {
    messageWrapper ['message'] = message;
    // console.log(JSON.stringify(messageWrapper));
    socket.broadcast.emit('new message', JSON.stringify(messageWrapper));
  });
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});
