import React, { useEffect, useState } from "react";
import Episode from "../component/Episode";
import SideBanner from "../component/homepage/SideBanner";
import MovieInfo from "../component/MovieInfo";
import axios from "axios";
import { apiURL } from "../component/constant";
import SildeMovie from "../component/SildeMovie";
import { useParams } from "react-router-dom";

const TVshow = () => {
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
        const res = await axios.get(`${apiURL}/watch/tvshow/${id}`);
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
    <>
      <div className=" flex flex-col lg:flex-row bg-zinc-full">
        <div className=" p-2 w-full lg:w-3/4">
          <MovieInfo info={data.movie} loading={data.loading} />
          <Episode list={data.movie} loading={data.loading} />
          <div className=" mt-8 pl-2">
            <SildeMovie title={"SAME CATEGORY"} list={data.side.slice(6, 18)} />
          </div>
        </div>
        <div className=" w-full lg:w-1/4 p-4 border-l-2 border-gray-50 border-opacity-10">
          <SideBanner
            title={"TVSHOWS MAYBE YOU LIKE"}
            list={data.side.slice(0, 5)}
          />
        </div>
      </div>
    </>
  );
};

export default TVshow;
