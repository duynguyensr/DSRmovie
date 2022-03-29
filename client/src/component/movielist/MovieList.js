import React from "react";
import { Link, useParams } from "react-router-dom";
import SingleMovie from "../SingleMovie";

const MovieList = ({ list, loading, title, page }) => {
  let { num, type, kind } = useParams();
  let newNum = parseInt(num);
  return (
    <div className=" text-white ">
      <h2 className=" text-white text-2xl block border-red-600 border-l-4 p-2 px-3 mb-6">
        {title}
      </h2>
      <div className=" w-full text-white grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3 lg:gap-4 mb-10">
        {loading && <p>Loading...</p>}
        {list.map((item) => (
          <SingleMovie
            title={item.title}
            img={item.thumbnail}
            link={item.link}
            time={item.time}
            key={item._id}
            id={item._id}
            isMovie={item.hasOwnProperty("linkWatch")}
          />
        ))}
      </div>
      {!list.loading && page > 1 && (
        <div className=" mb-4 w-full flex items-center justify-center">
          {[
            newNum - 3,
            newNum - 2,
            newNum - 1,
            newNum,
            newNum + 1,
            newNum + 2,
            newNum + 3,
          ].map((item) => (
            <div key={item}>
              {item > 0 && item <= page && (
                <Link
                  to={`/category/${
                    kind === undefined ? `` : `${kind}/`
                  }${type}/page/${item}`}
                >
                  <span
                    key={item}
                    className={`mr-2 transform duration-300 ease-in-out cursor-pointer drop-shadow-lg inline-flex w-10 h-10 ${
                      newNum === item
                        ? " bg-indigo-700 text-white"
                        : "bg-gray-600 text-black"
                    } hover:bg-black  font-roboto font-semibold text-lg hover:text-white flex items-center justify-center`}
                    // style={{
                    //   background: newNum === item && "#dc2626",
                    //   color: newNum === item && "white",
                    // }}
                  >
                    {item}
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
