let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const users = [];

io.on('connection', (socket) => {
    socket.on('new-nickname', (nickname) => {
        socket.username = nickname;
        users.push(socket.username);
        console.log('user connected');
    });
    socket.on('new-message', (message) => {
        io.emit("new-message", {
            username: socket.username,
            content: message
        });

    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
