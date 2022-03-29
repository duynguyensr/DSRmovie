import React from "react";
import { RiMovie2Fill } from "react-icons/ri";
import SingleBanner from "./SingleBanner";

const SideBanner = ({ title, list }) => {
  return (
    <div className=" p-1 lg:p-4 font-sans mt-0">
      <h3 className=" text-white text-xl font-semibold flex items-center mb-4">
        <RiMovie2Fill className="inline mr-1 text-red-600" />
        {title}
      </h3>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-2">
        {list.map((item) => (
          <SingleBanner
            img={item.thumbnail}
            title={item.title}
            link={item.link}
            time={item.time}
            id={item._id}
            isMovie={item.hasOwnProperty("linkWatch")}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default SideBanner;
