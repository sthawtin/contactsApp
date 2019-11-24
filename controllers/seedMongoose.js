/* Following code creates and populates a MongoDB database using Mongoose. 
Requires MongoDB to be installed and running on local machine, Node to be installed, and the mongoose package to be installed via npm.*/

module.exports = function() {
    const Contact = require('../models/Contact.js');

    const contactsJSON = [
        { name: 'Steve Wozniak', email: 'woz@apple.com', location: 'United States', primary: '718-886-5540' },
        { name: 'Linus Torvalds', email: 'linus@linux.com', location: 'Finland', primary: '+358 9 568 042' },
        { name: 'Bill Gates', email: 'bill@microsoft.com', location: 'United States', primary: '4841698514' },
        { name: 'Richard Stallman', email: 'richard@fsf.org', location: 'United States', primary: '664 613 7896' },
        { name: 'Ada Lovelace', email: 'ada@lovelace.co.uk', location: 'United Kingdom', primary: '02394 786236' },
        { name: 'Alan Turing', email: 'alan@turingtest.org.uk', location: 'United Kingdom', primary: '+44796 37829368' },
        { name: 'Charles Babbage', email: 'charles@diffengine.com', location: 'United Kingdom', primary: '+442392343478' },
        { name: 'Dennis Ritchie', email: 'dennis@cprogramming.com', location: 'United States', primary: '012-589-1651' },
        { name: 'Ken Thompson', email: 'ken@unix.net', location: 'United States', primary: '6434030340' },
        { name: 'Steve Jobs', email: 'steve@apple.com', location: 'United States', primary: '805-110-9825' }
      ];
    
    Contact.insertMany(contactsJSON, function(err, result) {
        if (err) throw err;
        console.log("cadb database created.")
        console.log("contacts collection created.")
        console.log(contactsJSON.length + " documents added to database.")
    });
}

