import React, { useEffect, useState } from "react";
import { apiURL } from "../component/constant";
import SideBanner from "../component/homepage/SideBanner";
import MovieList from "../component/movielist/MovieList";
import SildeMovie from "../component/SildeMovie";
import axios from "axios";
import { useParams } from "react-router-dom";

const MoviePage = () => {
  let { type, num, kind } = useParams();
  const [list, setList] = useState({
    loading: true,
    data: { MainList: [], SideList: [], SuggestList: [], page: 0 },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setList({ ...list, loading: true });
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const res = await axios.get(
          `${apiURL}/category/${
            kind === undefined ? `` : `${kind}`
          }/${type}/page/${num}`
        );
        if (res.data.success) {
          setList({ loading: false, data: res.data.dataReturn });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [type, num, kind]);
  return (
    <div className=" p-2 overflow-hidden text-white bg-zinc-full grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
      <div className=" overflow-hidden lg:col-span-3 ">
        <MovieList
          list={list.data.MainList}
          status={list.loading}
          title={type.toUpperCase()}
          page={list.data.page}
        />

        <SildeMovie
          title={"SUGGEST"}
          list={list.data.SuggestList.slice(0, 10)}
        />
        <SildeMovie
          title={"RANDOM"}
          list={list.data.SuggestList.slice(10, 20)}
        />
      </div>
      <div className=" p-2 bg-zinc-full border-l-0 lg:border-l-2 border-gray-100 border-opacity-10 ">
        <SideBanner title={"MAYBE YOU LIKE"} list={list.data.SideList} />
      </div>
    </div>
  );
};

export default MoviePage;
