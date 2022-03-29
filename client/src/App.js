import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./component/footer";
import Navbar from "./component/navbar";
import Home from "./page/Home";
import MoviePage from "./page/MoviePage";
import MovieWatch from "./page/MovieWatch";
import SearchPage from "./page/SearchPage";
import TVshow from "./page/TVshow";
import TVwatch from "./page/TVwatch";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="category/:type/page/:num" element={<MoviePage />} />
        <Route path="category/:kind/:type/page/:num" element={<MoviePage />} />
        <Route path="tv" element={<TVshow />} />
        <Route path="watch/movie/:id" element={<MovieWatch />} />
        <Route path="watch/tvshow/:id" element={<TVshow />} />
        <Route path="watch/tvshow/:id/:ss_id/:ep_id" element={<TVwatch />} />
        <Route path="search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
