var express = require('express');
var router = express.Router();

// Define a simple API endpoint
router.get('/hello', function(req, res, next) {
  res.json({ message: 'Hello from the API!' });
});

module.exports = router;
