const mongoose = require('mongoose');

// Mongoose Schema configuration
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

module.exports = mongoose.model('User', userSchema);
// End of Mongoose Schema configurationconst Schema = mongoose.Schema;
