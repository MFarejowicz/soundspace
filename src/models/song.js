const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  time: Number,
  sound: String
});

// Define the user schema
const SongSchema = new mongoose.Schema({
  name: String,
  ownerId: String,
  ownerName: String,
  timeStamp: String,
  notes: [NoteSchema],
  upvotes: Number,
  downvotes: Number
});

// Compile model from schema
module.exports = mongoose.model("Song", SongSchema);
