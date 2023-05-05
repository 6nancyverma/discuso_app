//this is node server which will handle socket io connection
const io = require('socket.io')(8000, { cors: { origin: '*', } });
const users = {};
io.on('connection', socket => {
    // if any new user joins,let other user connected to the server know
    socket.on('new-user-joined', name => {
        console.log("new user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });
    // if someone sends a message, broadcast it to other users
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    // if someone leaves the chat,let other users know
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

    
});