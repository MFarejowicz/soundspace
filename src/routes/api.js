const express = require('express');
const router = express.Router();

const User = require('../models/user');

// Route to log when a user taps
router.post('/tap', function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { googleid: req.user.googleid },
      { $inc: { taps: 1 } }
    )
    .catch((err) => {
      console.log(err);
    });
  }

  res.send({});
});

// Route to log when a user creates a room
router.post('/create', function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { googleid: req.user.googleid },
      { $inc: { roomsCreated: 1 } }
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
