import React from "react";
import { Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import SwiperCore from "swiper/core/core";
import breakpoints from "swiper/core/breakpoints";
import SingleMovie from "./SingleMovie";
SwiperCore.use([Autoplay, breakpoints]);

const SildeMovie = ({ title, list }) => {
  return (
    <div className=" mb-4">
      <h2 className=" text-white text-2xl block border-red-600 border-l-4 p-2 px-3 mb-8">
        {title}
      </h2>
      <div className=" h-72">
        <Swiper
          // install Swiper modules
          modules={[Scrollbar, A11y]}
          spaceBetween={15}
          slidesPerView={7}
          autoplay={{ delay: 2000 }}
          width={1150}
          className=" h-full"
        >
          {list.map((item) => (
            <SwiperSlide
              className=" h-full bg-zinc-full flex items-center justify-center"
              key={item.title}
            >
              <SingleMovie
                img={item.thumbnail}
                title={item.title}
                link={item.link}
                time={item.time}
                key={item.title}
                id={item._id}
                isMovie={item.hasOwnProperty("linkWatch")}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SildeMovie;
