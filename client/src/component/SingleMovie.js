import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleMovie = ({ img, id, title, time, isMovie }) => {
  return (
    <div className="group w-full h-auto mb-2 ">
      <Link to={`/watch/${isMovie ? "movie" : "tvshow"}/${id}`}>
        <div className=" overflow-hidden relative">
          <div className=" bg-black bg-opacity-0 absolute top-0 z-10 w-full h-full flex items-center justify-center transform ease-in-out duration-300 group-hover:bg-opacity-75 ">
            <FaPlay className="text-white text-5xl transform ease-in duration-300 opacity-0 group-hover:opacity-100" />
          </div>
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-auto w-full transform ease-in-out duration-500 group-hover:scale-110 "
          ></img>
        </div>
        <div className="p-1">
          <h3 className="text-white overflow-hidden font-roboto font-medium text-base whitespace-nowrap overflow-ellipsis ease-in-out duration-150 cursor-pointer group-hover:text-red-600">
            {title}
          </h3>
          <span className=" text-sm text-gray-300 font-medium block">
            {time}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SingleMovie;
