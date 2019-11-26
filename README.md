# ContactsApp
Simple Contacts App using AngularJS, Node, Express, and MongoDB.

## Installation
Requires Node be installed, and access to a running MongoDB instance.

To install the required Node dependencies, on a command-line whilst in the same directory as the file package.json, run:

```bash
npm install
```

In the app.js file replace the MONGO variable's 'localhost:27017' value with the location and details of your running MongoDB instance.
The resulting address will be set as 'mongodb://YOUR_URL/cadb'.

```bash
const MONGO = 'localhost:27017'
```

For demonstrative purposes, on the first run (or at startup an empty database is found) the database will be seeded with data.

To start the server run: 

```bash
node app
```

## Features
* Displaying contacts
* Add a contact
* Remove a contact
* Edit a contact

### Extra features
* Automatically sorted contacts list
* Basic search facility (filter)
* Basic responsive design

* Persistently stored data
* Basic backend API

* I have implemented a basic and functioning register and login facility, separate from the rest of the app, the code of which can be found in the login folder. However, owing to time constraints I have not integrated it with the app, and I have yet to encrypt passwords.

## Notes
### AngularJS
AngularJS (and front-end frameworks in general) was 100% new to me before I started. I have tried to learn as much as quickly as possible, but I still have a lot to get my head around.

My current AngularJS code, found in public/contacts.js and public/contacts.html, improves upon earlier and much messier implementations. My earlier versions did not make use of routing, ng-view, and multiple controllers as the latest iterations have.

I believe I should be making more use of custom services and factories, especially to share data between controllers. In the end, I settled with sharing data via the $routeScope, which probably isn't ideal or best practice.

### API and Database
I spent time developing a separate fairly rudimental API using Node and Express. One is able to interact with the API (e.g. adding/editing/deleting contacts) exclusively via URLs and HTTP methods, independently of the front-end. 

I have yet to include much data validation, either on the front end (HTML or AngularJS) or in the API.

Ideally I would also like to add some form of formatting of phone numbers according to location (e.g. prefixing +44 to UK numbers, and adding or removing spacing or hyphens as appropriate).

Data is persistenly stored in and retrieved from a MongoDB database.