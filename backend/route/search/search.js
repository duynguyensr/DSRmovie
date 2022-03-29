const router = require("express").Router();
const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");
const TVshow = require("../../model/TVshowModel");
const Movie = require("../../model/MovieModel");

router.post("/", async (req, res) => {
  try {
    const { searchKey } = req.body;
    const MovieList = await Movie.find({
      title: { $regex: searchKey, $options: "i" },
    }).lean();
    const TVList = await TVshow.find({
      title: { $regex: searchKey, $options: "i" },
    }).lean();

    const SideList = await Movie.aggregate([{ $sample: { size: 10 } }]);

    const dataReturn = await [...MovieList, ...TVList].sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    res.status(200).json({
      success: true,
      message: "Get search result successfully",
      list: dataReturn,
      SideList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

module.exports = router;
