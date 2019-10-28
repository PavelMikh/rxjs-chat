let express = require('express')
let app = express();
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const  Chat  = require('./chat-schema');
const  connect  = require('./dbconnection');

let users = [];
let messagesHistory = [];
let typingUsers = [];

io.on('connection', (socket) => {
    connect.then(db  => {
        Chat.find({}).then(chat  =>  {
            messagesHistory = chat;
        });
    });
    socket.on('new-nickname', (nickname) => {
        socket.username = nickname;
        socket.emit('new-nickname', socket.username);
        let userState = {usersName: typingUsers, state: false};
        if (userState.usersName.length > 0) {
            userState.state = true;
        }
        socket.emit('typing', userState);

        const systemMessage = {username: 'bot', content: 'User ' + socket.username + ' connected.'};
        connect.then(db  =>  {
            console.log('connected correctly to the server');

            let  chatMessage  =  new Chat(systemMessage);
            chatMessage.save();
        });
        // messagesHistory.push(systemMessage);
        io.emit('new-message', systemMessage);
        socket.emit('messages-history', messagesHistory);
        console.log('user ' + socket.username + ' connected');
    });

    socket.on('new-message', (message) => {
        // let tmp = {username: socket.username, content: message};
        // messagesHistory.push(tmp);
        socket.broadcast.emit('new-message', {
            username: socket.username,
            content: message
        });
        connect.then(db  =>  {
            console.log('connected correctly to the server');

            let  chatMessage  =  new Chat({username: socket.username, content: message});
            chatMessage.save();
        });
    });

    socket.on('user-state', (value) => {
        let userState = {usersName: typingUsers, state: true};
        if (value.length > 0) {
            if (typingUsers.indexOf(socket.username) === -1) {
                typingUsers.push(socket.username);
            }
            userState.state = true;
            socket.broadcast.emit('typing', userState);
        } else {
            const index = typingUsers.indexOf(socket.username);
            if (index !== -1) {
                typingUsers.splice(index, 1);
                if (typingUsers.length < 1) {
                    userState.state = false;
                }
                io.emit('typing', userState);
            } else {
                console.log('User ' + socket.username + ' is not exist in typingUsers array.')
            }
        }
    });

    socket.on('get-online-users', (fn) => {
        fn(users);
    });

    socket.on('authorization', (updateUsers) => {
        users = updateUsers;
    });

    socket.on('disconnect', function () {
        const index = users.indexOf(socket.username);
        let userState = {usersName: typingUsers, state: true};
        if (index !== -1) {
            const removingIndex = typingUsers.indexOf(socket.username);
            if (removingIndex !== -1) {
                typingUsers.splice(removingIndex, 1);
                if (typingUsers.length <= 1) {
                    userState.state = false;
                }
                io.emit('typing', userState);
            } else {
                console.log('User ' + socket.username + ' is not exist in typingUsers array.')
            }

            users.splice(index, 1);
            const systemMessage = {username: 'bot', content: 'User ' + socket.username + ' disconnected.'};
            connect.then(db  =>  {
                console.log('connected correctly to the server');

                let  chatMessage  =  new Chat(systemMessage);
                chatMessage.save();
            });
            // messagesHistory.push(systemMessage);
            io.emit('new-message', systemMessage);
            console.log('user ' + socket.username + ' disconnected');
        } else {
            console.log('User ' + socket.username + ' is not exist.')
        }
    });
});

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});

