let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('user connected');
    var data = {};
    socket.on('new-nickname', (nickname) => {
        socket.username = nickname;
        socket.emit('new-nickname', socket.username);
        data ['name'] = socket.username;
    });
    socket.on('new-message', (message) => {
        socket.emit("new-message", message);
        data ['message'] = message;
        // console.log(data);
        // io.emit('new message', data);
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
