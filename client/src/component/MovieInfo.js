import React from "react";
import { Link } from "react-router-dom";

const MovieInfo = ({ info, loading }) => {
  return (
    <>
      {loading === false && (
        <div className=" mb-2 px-0 py-2 lg:px-2 border-b-2 border-white border-opacity-40 flex flex-row text-white">
          <div className=" p-1 lg:p-3 w-2/5 lg:w-1/5 md:w-1/4">
            <div className=" overflow-hidden flex items-center justify-start">
              <img
                className=" w-full lg:w-52 h-auto "
                src={info.thumbnail}
                alt={info.title}
              ></img>
            </div>
          </div>
          <div className=" w-3/5 overflow-hidden md:w-3/4 lg:w-4/5 p-3 pl-2 divide-y-0.5 divide-white divide-opacity-40">
            <Link
              to={`/watch/${
                info.hasOwnProperty("linkWatch") ? `movie` : `tvshow`
              }/${info._id}`}
            >
              <h2 className=" font-sans text-lg md:text-2xl lg:text-4xl mb-3 hover:text-red-700 transform duration-150 ease-out">
                {info.title}
              </h2>{" "}
            </Link>
            <span className=" py-3 text-base text-gray-300 font-medium block">
              {info.time}
            </span>
            <ul className=" py-5 divide-x-0.5 divide-white divide-opacity-40 ">
              {info.category.map((item) => (
                <li
                  key={item}
                  className=" cursor-pointer inline px-2 first:pl-0 transform duration-150 ease-out hover:text-red-500"
                >
                  <Link to={`/category/${item}/page/1`}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to={`/watch/${
                info.hasOwnProperty("linkWatch") ? "movie" : "tvshow"
              }/${info._id}/${
                info.hasOwnProperty("linkWatch")
                  ? ""
                  : `${info.data[0]._id}/${info.data[0].episodes[0]._id}`
              }`}
            >
              <button className=" rounded-sm mt-2 transform transition-all duration-150 ease-linear font-roboto p-2 px-4 bg-gray-100 text-red-500 text-lg font-semibold hover:text-white hover:bg-yellow-500">
                Watch now
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfo;
