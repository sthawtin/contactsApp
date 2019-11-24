const mongoose = require('mongoose');

// Mongoose Schema configuration
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name: String,
    email: String,
    location: String,
    primary: String
});

module.exports = mongoose.model('Contact', contactSchema);
// End of Mongoose Schema configuration