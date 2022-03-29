const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

const router = require("express").Router();

router.get("/page/:num/", async (req, res) => {
  try {
    const { data } = await axios.get(
      `${process.env.apiURL}theloai/animation/page/${req.params.num}/`
    );
    const { window } = new JSDOM(data);
    const arrList = window.document
      .querySelector(".items.full")
      .querySelectorAll(".item");
    const dataReturn = {
      list: [],
    };
    arrList.forEach((item) => {
      dataReturn.list.push({
        thumbnail: item.querySelector("img").getAttribute("data-src"),
        linkWatch: "",
        title: item.querySelector("h3").textContent,
        time: item.querySelector("span").textContent,
        category: [],
      });
    });
    res.status(200).json({
      success: true,
      message: `Get ratings ${req.params.type} at page ${req.params.num} successfully`,
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
