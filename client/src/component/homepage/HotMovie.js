import SingleMovie from "../SingleMovie";
import SildeMovie from "../SildeMovie";

const HotMovie = ({ title, status, list }) => {
  return (
    <div className=" bg-zinc-full h-auto text-white p-3 ">
      <h2 className="text-2xl block border-red-600 border-l-4 p-2 px-3 mb-4">
        {title}
      </h2>
      {status && <p>Loading...</p>}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4 mb-12 pb-14 border-opacity-40 border-b-2 border-gray-200">
        {list.newFeature.map((item) => (
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
      <div className=" mb-6">
        <SildeMovie title={"NEW FEATURE"} list={list.newFeature} />
      </div>
    </div>
  );
};

export default HotMovie;
