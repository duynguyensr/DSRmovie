const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String },
  time: { type: String },
  thumbnail: { type: String },
  category: { type: Array },
  linkWatch: { type: String },
});

module.exports = mongoose.model("Movie", MovieSchema);
