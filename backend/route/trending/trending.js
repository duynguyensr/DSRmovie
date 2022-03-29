const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const router = require("express").Router();

router.get("/page/:num/:type", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.apiURL}trending/page/${req.params.num}/?get=${req.params.type}`
    );
    const { window } = new JSDOM(data);
    const arrList = window.document
      .querySelector(".items.full")
      .querySelectorAll(".item");
    const pageNum = window.document
      .querySelector(".pagination span")
      .textContent.split(" ");
    const dataReturn = {
      list: [],
    };
    arrList.forEach((item) => {
      dataReturn.list.push({
        img: item.querySelector("img").getAttribute("data-src"),
        link: item.querySelector("a").href,
        title: item.querySelector("h3").textContent,
        time: item.querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: `Get trending ${req.params.type} at page ${req.params.num} successfully`,
      numPage: pageNum[pageNum.length - 1],
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

router.get("/page/:num", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.apiURL}trending/page/${req.params.num}`
    );
    const { window } = new JSDOM(data);
    const arrList = window.document
      .querySelector(".items.full")
      .querySelectorAll(".item");
    const pageNum = window.document
      .querySelector(".pagination span")
      .textContent.split(" ");
    const dataReturn = {
      list: [],
    };
    arrList.forEach((item) => {
      dataReturn.list.push({
        img: item.querySelector("img").getAttribute("data-src"),
        link: item.querySelector("a").href,
        title: item.querySelector("h3").textContent,
        time: item.querySelector("span").textContent,
      });
    });
    res.status(200).json({
      success: true,
      message: `Get trending at page ${req.params.num} successfully`,
      numPage: pageNum[pageNum.length - 1],
      list: dataReturn.list,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});

module.exports = router;
