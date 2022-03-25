const mongoose = require("mongoose");

const TVshowSchema = new mongoose.Schema({
  title: { type: String },
  thumbnail: { type: String },
  time: { type: String },
  category: { type: Array },
  data: [
    {
      name: { type: String },
      time: { type: String },
      episodes: [
        {
          img: { type: String },
          title: { type: String },
          time: { type: String },
          link: { type: String },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("TVshow", TVshowSchema);
