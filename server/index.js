let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

let users = [];
let messagesHistory = [];

io.on('connection', (socket) => {
    socket.on('new-nickname', (nickname) => {
        socket.username = nickname;
        socket.emit('new-nickname', socket.username);
        const systemMessage = {username: 'bot', content: 'User ' + socket.username + ' connected.'};
        messagesHistory.push(systemMessage);
        io.emit('new-message', systemMessage);
        socket.emit('messages-history', messagesHistory);
        console.log('user '+ socket.username +' connected');
    });
    socket.on('new-message', (message) => {
        let tmp = {username: socket.username, content: message};
        messagesHistory.push(tmp);
        io.emit("new-message", {
            username: socket.username,
            content: message
        });
    });
    socket.on('get-online-users', (fn) => {
        fn(users);
    });
    socket.on('authorization', (updateUsers) => {
        users = updateUsers;
    });
    socket.on('disconnect', function () {
        users = users.filter((item) => {
            return item !== socket.username;
        });
        const systemMessage = {username: 'bot', content: 'User ' + socket.username + ' disconnected.'};
        messagesHistory.push(systemMessage);
        io.emit('new-message', systemMessage);
        console.log('user ' + socket.username + ' disconnected');
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

