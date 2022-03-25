const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const router = require("express").Router();
const Movie = require("../../model/MovieModel");
const TVshow = require("../../model/TVshowModel");

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

router.get("/movie/page/:num", async (req, res) => {
  try {
    const MainList = await Movie.find()
      .skip((req.params.num - 1) * 30)
      .limit(30);
    const maxPage = await Movie.count();
    const SideList = await Movie.aggregate([{ $sample: { size: 12 } }]);
    const SuggestList = await TVshow.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "get data successfully",
      dataReturn: {
        MainList,
        SideList,
        SuggestList,
        page: Math.ceil(maxPage / 30),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/tvshow/page/:num", async (req, res) => {
  try {
    const MainList = await TVshow.find()
      .skip((req.params.num - 1) * 30)
      .limit(30);
    const maxPage = await TVshow.count();
    const SideList = await TVshow.aggregate([{ $sample: { size: 12 } }]);
    const SuggestList = await Movie.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "get data successfully",
      dataReturn: {
        MainList,
        SideList,
        SuggestList,
        page: Math.ceil(maxPage / 30),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/:category/page/:num", async (req, res) => {
  try {
    const MovieList = await Movie.find({ category: `${req.params.category}` });
    const TVshowList = await TVshow.find({
      category: `${req.params.category}`,
    });
    const TempList = await [...MovieList, ...TVshowList].sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );
    const SideList = await TVshow.aggregate([{ $sample: { size: 12 } }]);
    const SuggestList = await Movie.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "get data successfully",
      dataReturn: {
        MainList: TempList.slice(req.params.num * 30 - 30, req.params.num * 30),
        SideList,
        SuggestList,
        page: Math.ceil(TempList.length / 30),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/movie/:cate/page/:num", async (req, res) => {
  try {
    const MovieList = await Movie.find({ category: `${req.params.cate}` })
      .skip((req.params.num - 1) * 30)
      .limit(30);
    const maxPage = await Movie.find({
      category: `${req.params.cate}`,
    }).count();
    const SideList = await TVshow.aggregate([{ $sample: { size: 12 } }]);
    const SuggestList = await Movie.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "get data successfully",
      dataReturn: {
        MainList: MovieList,
        SideList,
        SuggestList,
        page: Math.ceil(maxPage / 30),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/tvshow/:cate/page/:num", async (req, res) => {
  try {
    const MovieList = await TVshow.find({ category: `${req.params.cate}` })
      .skip((req.params.num - 1) * 30)
      .limit(30);
    const maxPage = await TVshow.find({
      category: `${req.params.cate}`,
    }).count();
    const SideList = await TVshow.aggregate([{ $sample: { size: 12 } }]);
    const SuggestList = await Movie.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "get data successfully",
      dataReturn: {
        MainList: MovieList,
        SideList,
        SuggestList,
        page: Math.ceil(maxPage / 30),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

module.exports = router;
