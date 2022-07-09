const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'))
const port = process.env.PORT || 8080;

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(cors());
const usersRouter = require('./server/routes/user');
const postsRouter = require('./server/routes/post');
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, function () {
  console.log(`Web server started listening on port ${port}`);
});
