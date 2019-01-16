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

module.exports = router;
