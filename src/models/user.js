const mongoose = require("mongoose");

// Define the user schema
const UserSchema = new mongoose.Schema({
  name: String,
  github_id: Number,
  github_username: String,
  taps: Number,
  roomsCreated: Number,
  roomsJoined: Number,
});

// Compile model from schema
module.exports = mongoose.model("User", UserSchema);
