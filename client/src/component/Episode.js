import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Episode = ({ list, loading }) => {
  const [activeSS, setActiveSS] = useState("");
  let { ep_id, ss_id } = useParams();
  useEffect(() => {
    if (loading) setActiveSS("");
    else if (ss_id !== undefined) setActiveSS(`${ss_id}`);
    else setActiveSS(list.data[0]._id);
  }, [loading, list, ss_id]);
  return (
    <>
      {loading === false && (
        <div className="w-full p-2 text-white">
          <h2 className="mt-4 text-white text-2xl font-roboto  font-normal mb-4">
            Seasons and episodes
          </h2>
          <div className=" w-full text-lg p-2">
            {list.data.map((season, index) => (
              <div key={season._id} className="  ">
                <div
                  className=" mb-1 cursor-pointer w-full h-14 flex bg-black bg-opacity-70"
                  onClick={() => {
                    if (activeSS === season._id) setActiveSS("");
                    else setActiveSS(season._id);
                  }}
                >
                  <span className="w-3/12 md:w-2/12   lg:w-1/12 bg-red-600 flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className=" text-base font-semibold w-4/12 md:w-2/12  lg:w-1/12 flex items-center justify-center">
                    {season.name}
                  </span>
                  <span className="p-2 w-5/12 md:w-8/12 lg:w-10/12 text-sm font-semibold text-white text-opacity-40 flex items-center">
                    {season.time}
                  </span>
                </div>
                {activeSS === season._id && (
                  <div>
                    {season.episodes.map((episode, index) => (
                      <div
                        key={episode._id}
                        className=" flex bg-black bg-opacity-20 my-1 p-1"
                      >
                        <span className="w-3/12 md:w-2/12 lg:w-1/12 flex items-center justify-center">
                          <img
                            src={episode.img}
                            alt={episode.title}
                            loading="lazy"
                          ></img>
                        </span>
                        <span className=" w-4/12 md:w-2/12 lg:w-1/12 text-sm text-white text-opacity-50 flex items-center justify-center">
                          E - {index + 1}
                        </span>
                        <div className=" text-base p-2 w-5/12 md:w-8/12 lg:w-10/12 text-white text-opacity-50 flex items-start justify-center flex-col">
                          <Link
                            to={`/watch/tvshow/${list._id}/${season._id}/${episode._id}`}
                          >
                            <h3
                              className={`${
                                ep_id === episode._id
                                  ? `text-red-600`
                                  : ` text-white`
                              } hover:text-red-600 transform duration-150 ease-out cursor-pointer `}
                            >
                              {episode.title}
                            </h3>
                            <p className=" text-sm">{episode.time}</p>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Episode;
