import React from "react";
import SingleMovie from "../SingleMovie";
import SildeMovie from "../SildeMovie";

const Movie = ({ title, status, list }) => {
  return (
    <div className=" bg-zinc-full h-auto text-white px-3">
      <h2 className="text-2xl block border-red-600 border-l-4 p-2 px-3 my-6">
        {title}
      </h2>
      {status && <p>Loading...</p>}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {title === "TV Shows"
          ? list.randomTV.map((item) => (
              <SingleMovie
                title={item.title}
                img={item.thumbnail}
                link={item.link}
                time={item.time}
                key={item.title}
                id={item._id}
                isMovie={item.hasOwnProperty("linkWatch")}
              />
            ))
          : list.randomMovie.map((item) => (
              <SingleMovie
                title={item.title}
                img={item.thumbnail}
                link={item.link}
                time={item.time}
                key={item.title}
                id={item._id}
                isMovie={item.hasOwnProperty("linkWatch")}
              />
            ))}
      </div>
      {title === "TV Shows" && (
        <div className=" mt-12 mb-12">
          <SildeMovie title={"HOT TRENDING"} list={list.newFeature} />
        </div>
      )}
    </div>
  );
};

export default Movie;
