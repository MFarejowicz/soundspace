const mongoose = require('mongoose');

// Define the user schema
const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  googleid     	: String
});

// Compile model from schema
module.exports = mongoose.model('UserModel', UserModelSchema);
