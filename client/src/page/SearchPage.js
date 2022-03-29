import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiURL } from "../component/constant";
import SideBanner from "../component/homepage/SideBanner";
import MovieInfo from "../component/MovieInfo";

const SearchPage = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get("key");
  const [list, setList] = useState({
    loading: true,
    data: [],
    side: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${apiURL}/search/`, {
          searchKey: name,
        });
        if (res.data.success) {
          setList({
            loading: false,
            data: res.data.list,
            side: res.data.SideList,
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [name]);
  return (
    <>
      <div className=" flex flex-col lg:flex-row justify-between p-3">
        <div className=" w-full lg:w-3/4 px-1 lg:px-11 pb-12 pt-5 lg:border-r-2 border-opacity-20 border-white">
          <div className=" relative w-full">
            <p className=" lg:ml-5 text-white text-3xl flex items-center justify-start p-2 border-l-4 mb-5 border-red-500">
              Results found : {name}
            </p>
            {!list.loading && list.data.length === 0 && (
              <div className="text-white text-opacity-50 ml-3 md:ml-8 lg:ml-10">
                <p className=" text-white text-2xl mb-3">
                  No results to show with {name}
                </p>
                <span className=" text-2xl">Suggestion:</span>
                <ul className=" text-base list-disc list-inside mt-4 ">
                  <li>Make sure all words are spelled correctly.</li>
                  <li>Try different keywords.</li>
                  <li>Try more general keywords.</li>
                </ul>
              </div>
            )}
            <div className=" lg:mx-5">
              {list.data.map((item) => (
                <MovieInfo loading={list.loading} info={item} key={item._id} />
              ))}
            </div>
          </div>
        </div>
        <div className=" sideScroll px-1 lg:px-3 w-full lg:w-1/4 h-117 md:h-150 overflow-scroll">
          <SideBanner title={"SUGGEST"} list={list.side}></SideBanner>
        </div>
      </div>
    </>
  );
};

export default SearchPage;
