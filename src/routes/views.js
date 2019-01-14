const express = require('express');
const router = express.Router();

// Root endpoint
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'src/views' });
});

// About endpoint
router.get('/about', function(req, res) {
  res.sendFile('about.html', { root: 'src/views' });
})

module.exports = router;
