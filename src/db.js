const mongoose = require('mongoose');
const { mongoCredentials } = require('./credentials');

// set up mongoDB connection
const mongoURL = mongoCredentials.url;
const options = {
  useNewUrlParser: true
};
mongoose.set('useFindAndModify', false);
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
