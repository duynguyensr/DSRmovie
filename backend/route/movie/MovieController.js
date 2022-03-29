const Movie = require("../../model/MovieModel");
const TV = require("../../model/TVshowModel");

const router = require("express").Router();

//add movie
router.post("/", async (req, res) => {
  const newMovie = new Movie(req.body);

  try {
    const savedMovie = await newMovie.save();
    res.status(200).json({
      success: true,
      message: "movie was created",
      movieInfo: savedMovie,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

//add TVShows
router.post("/tvshow", async (req, res) => {
  const newTV = new TV(req.body);

  try {
    const savedTV = await newTV.save();
    res.status(200).json({
      success: true,
      message: "TVshow was created",
      TVInfo: savedTV,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;
