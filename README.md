# ContactsApp
Simple Contacts App using AngularJS, Node, Express, and MongoDB.

## Installation
Requires Node be installed, and access to a running MongoDB instance.

To install the required Node dependencies, whilst in the same directory as package.json, on a command-line run:

```bash
npm install
```

In the app.js file replace 'YOUR_URL' with the location and details of your running MongoDB instance.
The resulting address will be set as 'mongodb://YOUR_URL/cadb'

```bash
const MONGO = 'YOUR_URL'
```

To start the server: 

```bash
node app
```

On the first run (or an empty database) the database will be seeded with data.


* [Node]() - Node, JavaScript runtime environment
* [Express]() - Express, web server framework
* [MongoDB]() - MongoDB, document-oriented database management system
