import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../component/constant";
import MovieIframe from "../component/MovieIframe";
import SildeMovie from "../component/SildeMovie";
import SideBanner from "../component/homepage/SideBanner";
import MovieInfo from "../component/MovieInfo";
import Episode from "../component/Episode";
import { useParams } from "react-router-dom";

const TVwatch = () => {
  const [data, setList] = useState({
    loading: true,
    TV: {},
    side: [],
    linkWatch: "",
  });
  let { id, ss_id, ep_id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const res = await axios.get(
          `${apiURL}/watch/episode/${id}/${ss_id}/${ep_id}`
        );
        if (res.data.success) {
          setList({
            loading: false,
            TV: res.data.dataReturn.TVData,
            side: res.data.dataReturn.SideData,
            linkWatch: res.data.dataReturn.linkWatch,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [ep_id, id, ss_id]);
  return (
    <div>
      <div className=" flex flex-col lg:flex-row bg-zinc-full">
        <div className=" border-r-2 border-white border-opacity-20 p-2 w-full lg:w-3/4">
          <div className=" h-64 md:h-80 lg:h-90 p-0 lg:p-4  pt-0 border-b-2 border-white border-opacity-50 mt-4">
            <MovieIframe info={data.linkWatch} />
          </div>
          <div className="px-2">
            <MovieInfo info={data.TV} loading={data.loading} />
          </div>
          <Episode list={data.TV} loading={data.loading} />
          <div className=" mt-8 pl-2">
            <SildeMovie title={"SAME CATEGORY"} list={data.side.slice(6, 18)} />
          </div>
        </div>
        <div className=" w-full lg:w-1/4 px-4">
          <SideBanner
            title={"TVSHOWS MAYBE YOU LIKE"}
            list={data.side.slice(0, 5)}
          />
        </div>
      </div>
    </div>
  );
};

export default TVwatch;
