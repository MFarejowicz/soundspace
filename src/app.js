const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');

const db = require('./db');
const passport = require('./passport');
const views = require('./routes/views');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Set up body-parser to let us get the body of POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up nunjucks to be used for rendering
nunjucks.configure('src/views', {
  autoescape: true,
  express: app
});

// Set up sessions
app.use(session({
  secret: 'session-secret',
  resave: false,
  saveUninitialized: true
}));

// Set up actual passport usage
app.use(passport.initialize());
app.use(passport.session());

// Set up login route (when you go off to login)
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// Set up login callback route (when you return from login)
app.get('/auth/google/callback',
  passport.authenticate('google', {successRedirect: 'back', failureRedirect: 'back', session: true})
);

// Set up logout route
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.use('/', views);
app.use('/static', express.static('public'));

io.on('connection', function(socket) {
  socket.on('play sound', (sound) => {
    io.to(socket.room).emit('play sound', sound);
  });
  socket.on('join room', (room) => {
    socket.room = room;
    socket.join(room);
  })
});

http.listen(3000, () => console.log('App listening on port 3000!'));
