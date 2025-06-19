const { io } = require('socket.io-client');

const socket = io('http://localhost:3000', {
  query: {
    userId: 'testUser-2',
    token: 'valid_token',
  }
});

socket.on('connect', () => {
  console.log("successfully connected");

  //socket.emit('joinRoom', 'testRoom');
//
  //setTimeout(() => {
  //  socket.emit('sendToRoom', {
  //    room: 'testRoom',
  //    message: 'СООБЩЕНИЕ КОМНАТЕ',
  //  })
  //}, 3000);

  socket.emit('authMessage', 'сообщение под авторизацией');
});

socket.on('roomMessage', (data) => {
  console.log('СООБЩЕНИЕ ИЗ КОМНАТЫ ' + JSON.stringify(data));
});

socket.on('privateMessage', (data) => {
  console.log('private message ' + JSON.stringify(data));
})

socket.on('disconnect', () => {
  console.log('disconnected');
});
