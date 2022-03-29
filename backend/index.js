const express = require("express");
const app = express();

const dotenv = require("dotenv");
const cors = require("cors");

//khoi dong body-parser middleware
app.use(express.urlencoded({ extended: false }));

//khoi dong express middleware
app.use(express.json());
app.use(cors());

dotenv.config();

const connectDB = require("./dbconnect");

connectDB();

const homeRouter = require("./route/homepage/hotmovie");
const trendingRouter = require("./route/trending/trending");
const ratingRouter = require("./route/trending/rating");
const categoryRouter = require("./route/category/category");
const searchRouter = require("./route/search/search");
const watchRouter = require("./route/watch/watch");
const movieController = require("./route/movie/MovieController");

app.use("/api/home", homeRouter);
app.use("/api/trending", trendingRouter);
app.use("/api/ratings", ratingRouter);
app.use("/api/category", categoryRouter);
app.use("/api/search", searchRouter);
app.use("/api/watch", watchRouter);

app.use("/api/movie", movieController);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
