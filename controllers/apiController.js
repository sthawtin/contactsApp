const express = require ('express');
const router = express.Router();

// Import Model for Contact MongoDB schema and configuration
const Contact = require('../models/Contact.js');

// API HTTP Method Requests
// Handle GET requests. Serves all entires in the 'Contact' collection as a single JSON document.
router.get('/contacts', (req, res) => {
    Contact.find((err, result) => {
        if (err) throw err;      
        res.json(result);
    });
});

// Handle POST requests. Checks for id in request body, and updates or creates an entry appropriately.
router.post('/contacts', (req, res) => {       
    if (req.body.id) {
        // If ID is present in response body of POST request, then UPDATE the associated entry
        Contact.findByIdAndUpdate(req.body.id, req.body, (err, result) => {
            if (err) throw err;
            res.json(result);
        })
    } else {
        // otherwise create a new entry
        let newContact = Contact(req.body);
        newContact.save((err, result) => {
            if (err) throw err;
            res.json(result)
        })
    }
});

// Handles DELETE requests by passing database entry id in query string.
router.delete('/contacts/:id', (req, res) => { 
    Contact.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) throw err;
        res.end();
    })
});
// End of API

module.exports = router;