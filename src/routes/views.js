const express = require('express');
const router = express.Router();

// Root endpoint
router.get('/', function(req, res) {
  console.log(req.isAuthenticated());
  res.render('index.html', { loggedIn: req.isAuthenticated() });
});

// About endpoint
router.get('/about', function(req, res) {
  res.render('about.html');
});

module.exports = router;
