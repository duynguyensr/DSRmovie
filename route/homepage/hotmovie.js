const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const router = require("express").Router();
const Movie = require("../../model/MovieModel");
const TVshow = require("../../model/TVshowModel");

router.get("/test", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.apiURL}`);
    console.log(data);

    res.status(200).json({
      success: true,
      message: "Get new hot movie success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/hot", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.apiURL}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const { window } = new JSDOM(data);
    const arrHot = window.document
      .querySelector(".featured")
      .querySelectorAll(".item");
    const dataReturn = {
      list: [],
    };
    arrHot.forEach((item) => {
      dataReturn.list.push({
        img: item
          .querySelector(".poster")
          .querySelector("img")
          .getAttribute("data-src"),
        link: item
          .querySelector(".poster")
          .querySelector("a")
          .getAttribute("href"),
        title: item.querySelector(".dfeatur").querySelector("h3 a").textContent,
        time: item.querySelector(".dfeatur").querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: "Get new hot movie success",
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/tvshow", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.apiURL}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const { window } = new JSDOM(data);
    const arrTV = window.document
      .querySelectorAll(".items.full")[1]
      .querySelectorAll(".full .tvshows");
    const dataReturn = {
      list: [],
    };
    arrTV.forEach((item) => {
      dataReturn.list.push({
        img: item
          .querySelector(".poster")
          .querySelector("img")
          .getAttribute("data-src"),
        link: item
          .querySelector(".poster")
          .querySelector("a")
          .getAttribute("href"),
        title: item.querySelector(".data").querySelector("h3 a").textContent,
        time: item.querySelector(".data").querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: "Get TV shows success",
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/movie", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.apiURL}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const { window } = new JSDOM(data);
    const arrMovie = window.document
      .querySelectorAll(".items.full")[2]
      .querySelectorAll(".movies");
    const dataReturn = {
      list: [],
    };
    arrMovie.forEach((item) => {
      dataReturn.list.push({
        img: item
          .querySelector(".poster")
          .querySelector("img")
          .getAttribute("data-src"),
        link: item
          .querySelector(".poster")
          .querySelector("a")
          .getAttribute("href"),
        title: item.querySelector(".data").querySelector("h3 a").textContent,
        time: item.querySelector(".data").querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: "Get movies success",
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/hotweek", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.apiURL}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const { window } = new JSDOM(data);
    const arrHotWeek = window.document
      .querySelector(".dt_views_count")
      .querySelectorAll(".w_item_a");
    const dataReturn = {
      list: [],
    };
    arrHotWeek.forEach((item) => {
      dataReturn.list.push({
        img: item.querySelector("img").getAttribute("data-src"),
        link: item.querySelector("a").getAttribute("href"),
        title: item.querySelector(".data").querySelector("h3").textContent,
        time: item.querySelector(".data").querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: "Get hot week success",
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/topImdb", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.apiURL}`, {
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const { window } = new JSDOM(data);
    const arrHotWeek = window.document
      .querySelector(".imdbRating")
      .querySelectorAll(".w_item_a");
    const dataReturn = {
      list: [],
    };
    arrHotWeek.forEach((item) => {
      dataReturn.list.push({
        img: item.querySelector("img").getAttribute("data-src"),
        link: item.querySelector("a").getAttribute("href"),
        title: item.querySelector(".data").querySelector("h3").textContent,
        time: item.querySelector(".data").querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: "Get top Imdb success",
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Oops! Something went wrong",
    });
  }
});

router.get("/all", async (req, res) => {
  try {
    const newMovie = await Movie.find().limit(7);
    const newTV = await TVshow.find().limit(8);
    const newFeature = [...newMovie, ...newTV];

    const randomMovie = await Movie.aggregate([{ $sample: { size: 18 } }]);
    const randomTV = await TVshow.aggregate([{ $sample: { size: 18 } }]);

    res.cookie("cookieName", "cookieValue", { sameSite: "none", secure: true });
    res.status(200).json({
      success: "true",
      message: "get data successfullly",
      dataReturn: {
        newFeature,
        randomMovie,
        randomTV,
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
