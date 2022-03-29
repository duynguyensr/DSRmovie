import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiURL } from "../component/constant";
import HotMovie from "../component/homepage/HotMovie";
import Movie from "../component/homepage/Movie";
import SideBanner from "../component/homepage/SideBanner";

const Home = () => {
  const [data, setData] = useState({
    loading: true,
    list: { newFeature: [], randomMovie: [], randomTV: [] },
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const res = await axios.get(`${apiURL}/home/all`);
        if (res.data.success) {
          setData({
            loading: false,
            list: { ...res.data.dataReturn },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className=" p-1 bg-zinc-full grid grid-cols-1 lg:grid-cols-4 gap-0 w-full">
        <div className="lg:col-span-3">
          <HotMovie
            title={"Hot Trending"}
            status={data.loading}
            list={data.list}
          />
          <Movie title={"TV Shows"} status={data.loading} list={data.list} />
          <Movie title={"Movies"} status={data.loading} list={data.list} />
        </div>
        <div className=" bg-zinc-full px-0.5">
          <SideBanner
            title={"MOVIES MAYBE YOU LIKE"}
            list={data.list.randomMovie.slice(0, 11)}
          />
          <SideBanner
            title={"TVSHOWS MAYBE YOU LIKE"}
            list={data.list.randomTV.slice(0, 10)}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
