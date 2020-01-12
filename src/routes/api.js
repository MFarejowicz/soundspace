const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Song = require("../models/song");

router.get("/userinfo", function(req, res) {
  if (req.isAuthenticated()) {
    User.findOne({ github_id: req.user.github_id })
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        res.send("An error occurred!");
      });
  } else {
    res.send("anon");
  }
});

router.get("/getsongs", function(req, res) {
  Song.find({}).then(songs => {
    res.send(songs);
  });
});

// Route to log when a user taps
router.post("/tap", function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { github_id: req.user.github_id },
      { $inc: { taps: 1 } },
      { new: true }
    )
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    res.send("Login required");
  }
});

// Route to log when a user creates a room
router.post("/create", function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { github_id: req.user.github_id },
      { $inc: { roomsCreated: 1 } }
    ).catch(err => {
      console.log(err);
    });
  }

  res.send({});
});

// Route to log when a user joins a room
router.post("/join", function(req, res) {
  if (req.isAuthenticated()) {
    User.findOneAndUpdate(
      { github_id: req.user.github_id },
      { $inc: { roomsJoined: 1 } }
    ).catch(err => {
      console.log(err);
    });
  }

  res.send({});
});

router.post("/savesong", function(req, res) {
  if (req.isAuthenticated()) {
    const song = new Song({
      name: req.body.name,
      ownerId: req.user.github_id,
      ownerName: req.user.name,
      timeStamp: new Date(),
      notes: req.body.song,
      upvotes: 0,
      downvotes: 0
    });

    song.save(function(err) {
      if (err) {
        console.log(err);
        res.send("An error occurred!");
      }
      console.log("song saved!");
      res.send("success!");
    });
  } else {
    res.send("Login required.");
  }
});

router.post("/deletesong", function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.github_id === req.body.song.ownerId) {
      Song.deleteOne({ _id: req.body.song._id }, function(err) {
        if (err) {
          console.log(err);
          res.send("An error occurred!");
        }
        console.log("song deleted!");
        res.send("success!");
      });
    } else {
      res.send("you don't own this song!");
    }
  } else {
    res.send("Login required.");
  }
});

module.exports = router;
