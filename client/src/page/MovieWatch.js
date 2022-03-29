import React, { useEffect, useState } from "react";
import { apiURL } from "../component/constant";
import MovieIframe from "../component/MovieIframe";
import MovieInfo from "../component/MovieInfo";
import axios from "axios";
import SildeMovie from "../component/SildeMovie";
import SideBanner from "../component/homepage/SideBanner";
import { useParams } from "react-router-dom";

const MovieWatch = () => {
  const [data, setList] = useState({
    loading: true,
    movie: {},
    side: [],
  });
  let { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const res = await axios.get(`${apiURL}/watch/movie/${id}`);
        if (res.data.success) {
          setList({
            loading: false,
            movie: res.data.dataReturn.MovieData,
            side: res.data.dataReturn.SideData,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <div>
      <div className=" px-2 flex flex-col lg:flex-row bg-zinc-full">
        <div className=" border-r-2 border-white border-opacity-10 p-2 w-full lg:w-3/4">
          <div className=" h-64 md:h-80 lg:h-90 p-0 lg:p-4  pt-0 border-b-2 border-white border-opacity-50 mt-4">
            <MovieIframe info={data.movie.linkWatch} />
          </div>
          <div>
            <MovieInfo info={data.movie} loading={data.loading} />
          </div>
          <div className=" mt-8 pl-2">
            <SildeMovie title={"SAME CATEGORY"} list={data.side.slice(6, 18)} />
          </div>
        </div>
        <div className=" w-full lg:w-1/4 p-4">
          <SideBanner
            title={"MOVIES MAYBE YOU LIKE"}
            list={data.side.slice(0, 6)}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieWatch;
