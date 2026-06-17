const mongoose = require("mongoose");

const moviesSchema = new mongoose.Schema(
  {
    title: String,
    posterUrl: String,
    desc: String,
    runtime: Number,
    cast: [
      {
        name: String,
        alias: String,
        profilePic: String,
      },
    ],
    theatres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theatre",
      },
    ],
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", moviesSchema);

module.exports = Movie;
