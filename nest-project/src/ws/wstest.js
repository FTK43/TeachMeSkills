const { io } = require('socket.io-client');

const socket = io('http://localhost:3000', {
  query: {
    userId: 'testUser',
    token: 'valid_token',
  },
});

socket.on('connect', () => {
  console.log("client 1 successfully connected");

  // socket.emit('joinRoom', 'testRoom');

  // setTimeout(() => {
  //   socket.emit('sendToRoom', {
  //     room: 'testRoom',
  //     message: 'СООБЩЕНИЕ КОМНАТЕ',
  //   })
  // }, 3000);

  //socket.emit('authMessage', 'сообщение под авторизацией');
  setTimeout(() => {
    socket.emit('privateMessage', {
      to: 'testUser-2',
      message: 'Привет, testUser-2!',
    });
  }, 2500);
});

socket.on('roomMessage', (data) => {
  console.log('СООБЩЕНИЕ ИЗ КОМНАТЫ ' + JSON.stringify(data));
});

socket.on('userServiceMessage', (data) => {
  console.log('СООБЩЕНИЕ ОТ USER SERVICE ' + JSON.stringify(data));
})

socket.on('disconnect', () => {
  console.log('disconnected');
});
