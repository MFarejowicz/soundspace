const express = require('express');
const router = express.Router();

// Root endpoint
router.get('/', function(req, res) {
  res.render('index.html', { loggedIn: req.isAuthenticated() });
});

// About endpoint
router.get('/about', function(req, res) {
  res.render('about.html');
});

// Observatory endpoint
router.get('/observatory', function(req, res) {
  res.render('observatory.html');
})

router.get('/space/:space', function(req, res) {
  const space = req.params.space;
  // console.log("room: " + space);
  if (space.length === 4) {
    res.render('space.html', { spacecode: space, loggedIn: req.isAuthenticated() } );
  } else {
    res.send("Sorry! Not a valid room code");
  }
});

module.exports = router;
