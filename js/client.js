
const socket = io('http://localhost:8000');
// get dom elements in respective js variable
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
var audio = new Audio('sound.mp3');
// function which will append event info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') { audio.play(); }
}

// ask new user to his/her name and the server know
const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

// if new user joined,receive his/her name  from the server
socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right')
});

// if server sends a message, receive it
socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});
// if a user leaves the chat, append the info to the container
socket.on('left', name => {
    append(`${name} left the chat`, 'left')
 
});
// if the form gets submitted, send message to the
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
    $this.dispatchBrowserEvent('scrollDown');
});
