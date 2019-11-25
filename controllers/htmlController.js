const express = require('express');
const router = express.Router();
const path = require('path');

// Route responding to requests to '/' url. 
// Send static HTML file in response, a file containing AngularJS markup and references.
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..//public/contacts.html'));
});

module.exports = router;