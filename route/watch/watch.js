const { default: axios } = require("axios");
const { json } = require("express");
const { JSDOM } = require("jsdom");
const router = require("express").Router();

const Movie = require("../../model/MovieModel");
const TVshow = require("../../model/TVshowModel");

//get tvshow detail and episode  link
router.get("/tvshow/:id", async (req, res) => {
  try {
    const MovieData = await TVshow.findById(req.params.id).lean();
    const SideData = await TVshow.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "Get movie successfully",
      dataReturn: {
        MovieData,
        SideData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

//get data movie
router.get("/movie/:id", async (req, res) => {
  try {
    const MovieData = await Movie.findById(req.params.id).lean();
    const SideData = await Movie.aggregate([{ $sample: { size: 20 } }]);
    res.status(200).json({
      success: true,
      message: "Get movie successfully",
      dataReturn: {
        MovieData,
        SideData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

//get link one specific episode for tv show
router.get("/episode/:id/:season_id/:episode_id", async (req, res) => {
  try {
    const TVData = await TVshow.findById(req.params.id).lean();
    const SideData = await TVshow.aggregate([{ $sample: { size: 20 } }]);

    const linkWatch = TVData.data
      .find((season) => season._id == req.params.season_id)
      .episodes.find((episode) => episode._id == req.params.episode_id).link;
    res.status(200).json({
      success: true,
      message: "Get movie successfully",
      dataReturn: {
        TVData,
        linkWatch,
        SideData,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/:name", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.apiURL}phimbo/${req.params.name}`
    );
    const { window } = new JSDOM(data);
    const item = window.document.querySelector(".sheader");
    const dataReturn = {
      thumbnail: item
        .querySelector(".poster")
        .querySelector("img")
        .getAttribute("data-lazy-src"),
      time: item.querySelector(".data").querySelector("span").textContent,
      title: item.querySelector(".data").querySelector("h1").textContent,
      category: [],
      data: [],
    };

    const season = window.document.querySelectorAll(".se-c");

    season.forEach((item) => {
      const list = [];
      const tap = item.querySelectorAll("li");
      if (
        item.querySelector(".se-q").querySelector(".title").innerHTML !==
        "Specials"
      ) {
        tap.forEach((item) => {
          list.push({
            img: item.querySelector("img").getAttribute("data-lazy-src"),
            title: item.querySelector("a").innerHTML,
            time: item.querySelector("span").innerHTML,
            link: "",
          });
        });
        dataReturn.data.push({
          name: item.querySelector(".se-q").querySelector(".title").innerHTML,
          time: "",
          episodes: list,
        });
      }
    });

    res.status(200).json({
      success: true,
      message: `Get ratings ${req.params.type} at page ${req.params.num} successfully`,
      list: dataReturn,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
