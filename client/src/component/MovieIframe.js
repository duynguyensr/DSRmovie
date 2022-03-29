import React from "react";
import { BiMovie } from "react-icons/bi";

const MovieIframe = ({ loading, info }) => {
  return (
    <div className=" p-0 lg:p-5 w-full h-full">
      <div className="mx-0 lg:mx-2 border-2 border-white border-opacity-20 flex items-center justify-center p-3 px-4 bg-black h-13/15 md:h-13/15 lg:h-14/15 ">
        <iframe
          title={info}
          width="90%"
          height="100%"
          src={info}
          frameBorder="0"
          scrolling="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className=" mx-0 lg:mx-2 h-2/15 md:h-2/15 lg:h-1/15 flex items-center justify-between text-2xl font-sans">
        <div className=" text-base lg:text-2xl font-semibold text-white flex items-center justify-center">
          <BiMovie className="inline " />
          <span className=" ml-1 lg:ml-2">Video Source</span>
        </div>
        <div>
          <h3 className=" text-sm lg:text-base font-sans font-medium text-red-600">
            View: {Math.random().toFixed(3) * 1000}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MovieIframe;
