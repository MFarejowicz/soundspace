const express = require('express');
const router = express.Router();

// Root endpoint
router.get('/', function(req, res) {
  res.sendFile('index.html', { root: 'src/views' });
});

module.exports = router;
