const express = require('express');
const router = express.Router();

const User = require('../models/user');

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

module.exports = router;
