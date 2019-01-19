const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/userinfo', function(req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ googleid: req.user.googleid })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send('An error occurred!')
    });
  } else {
    res.send('Login required.')
  }
});

// Route to log when a user taps
router.post('/tap', function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { googleid: req.user.googleid },
      { $inc: { taps: 1 } },
      { new: true },
    )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
    });
  } else {
    res.send('Login required');
  }
});

// Route to log when a user creates a room
router.post('/create', function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { googleid: req.user.googleid },
      { $inc: { roomsCreated: 1 } },
    )
    .catch((err) => {
      console.log(err);
    });
  }

  res.send({});
});

// Route to log when a user joins a room
router.post('/join', function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { googleid: req.user.googleid },
      { $inc: { roomsJoined: 1 } }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  res.send({});
});

module.exports = router;
