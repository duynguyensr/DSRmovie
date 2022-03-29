import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";
const SingleBanner = ({ img, title, isMovie, id, time }) => {
  return (
    <div className=" overflow-hidden h-48 w-full group text-white mb-1 relative cursor-pointer">
      <Link to={`/watch/${isMovie ? "movie" : "tvshow"}/${id}`}>
        <div className=" bg-black bg-opacity-0 absolute top-0 z-10 w-full h-full flex items-center justify-center transform ease-in-out duration-300 group-hover:bg-opacity-75 ">
          <FaPlay className="text-red-600 text-5xl transform ease-out duration-300 opacity-0 group-hover:opacity-100" />
        </div>
        <div>
          <img
            src={img}
            alt={title}
            load="lazy"
            className=" w-full h-72 transform ease-in-out duration-300 group-hover:scale-110"
          ></img>
        </div>
        <div className=" absolute bottom-3 left-3">
          <h4 className=" bg-white bg-opacity-10 text-lg text-white font-roboto font-semibold ">
            {title}
          </h4>
          <span className="  bg-white bg-opacity-10 text-lg text-gray-200 text-base font-medium">
            {time}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SingleBanner;
