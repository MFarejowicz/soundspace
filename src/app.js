const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const views = require('./routes/views');

app.use('/', views);
app.use('/static', express.static('public'));

io.on('connection', function(socket){
  socket.on('play sound', sound => {
    io.emit('play sound', sound);
  })
});

http.listen(3000, () => console.log('App listening on port 3000!'));