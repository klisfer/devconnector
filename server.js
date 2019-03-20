const express = require("express");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();



//DB Config
const uri = require('./config/keys').mongoURI;





//Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {

  client.close();
});

app.get('/', (req, res) => res.send("Hey"));



// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server is running on ${port}`));
