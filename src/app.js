const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const session = require('express-session');

const db = require('./db');
const passport = require('./passport');
const views = require('./routes/views');

app.use('/', views);
app.use('/static', express.static('public'));

// Set up body-parser to let us get the body of POST requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up sessions
app.use(session({
  secret: 'session-secret',
  resave: 'false',
  saveUninitialized: 'true'
}));

// Set up actual passport usage
app.use(passport.initialize());
app.use(passport.session());

// Set up login route (when you go off to login)
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

// Set up login callback route (when you return from login)
app.get('/auth/google/callback',
  passport.authenticate('google', { successRedirect: 'back', failureRedirect: 'back' })
);

// Set up logout route
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

io.on('connection', function(socket) {
  socket.on('play sound', sound => {
    io.emit('play sound', sound);
  });
});

http.listen(3000, () => console.log('App listening on port 3000!'));
