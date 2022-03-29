import React, { useState } from "react";
import { BiRightArrow, BiSearch } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { dataKey } from "./constant";

const Navbar = () => {
  const data = [
    {
      id: 1,
      title: "MOVIE",
      list: { trending: "Phim hot", rating: "Đánh giá cao" },
    },
    {
      id: 2,
      title: "TVSHOW",
      list: { trending: "Phim hot", rating: "Đánh giá cao" },
    },
    {
      id: 3,
      title: "CATEGORY",
      list: dataKey,
    },
    { id: 4, title: "TOPIMDB" },
    { id: 5, title: "HOT" },
  ];
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  // useEffect(() => {
  //   window.onscroll = () => {
  //     myFunction();
  //   };

  //   function myFunction() {
  //     if (document.documentElement.scrollTop > 100) {
  //       document.querySelector(".navbar").style.opacity = "0";
  //     } else {
  //       document.querySelector(".navbar").style.opacity = "1";
  //     }
  //   }
  // }, []);

  var lastScrollTop = 0;

  // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
  window.addEventListener(
    "scroll",
    function () {
      // or window.addEventListener("scroll"....
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        document.querySelector(".navbar").style.opacity = "0";
      } else {
        document.querySelector(".navbar").style.opacity = "1";
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );

  let navigate = useNavigate();
  const SubmitSearch = () => {
    navigate(`/search?key=${searchKey}`);
  };

  const onChangeForm = (e) => {
    setSearchKey(e.target.value);
  };
  return (
    <>
      <div className=" transform navbar ease-linear duration-200 lg:sticky top-0 left-0 bg-zinc-full min-w-full h-15 lg:h-20 container flex items-center justify-between lg:justify-between shadow p-3 z-40">
        {!showMenu ? (
          <span
            className="block text-white lg:hidden text-2xl"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <RiMenu2Fill />
          </span>
        ) : (
          <span
            className="block text-red-700 lg:hidden text-2xl"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <AiOutlineClose />
          </span>
        )}
        <Link to="">
          <h1 className=" text-red-600 text-3xl font-bold font-sans">
            <span className="text-white">DSR</span>movies
          </h1>
        </Link>

        <div className=" flex justify-between hidden lg:flex w-1/2 lg:w-1/3">
          {data.map((item) => {
            return (
              <div key={item.id} className="dropdown relative h-auto ">
                <Link
                  to={
                    item.title !== "CATEGORY" &&
                    `category/${
                      item.title === `TOPIMDB`
                        ? `rating`
                        : item.title === `HOT`
                        ? `trending`
                        : item.title.toLowerCase()
                    }/page/1`
                  }
                >
                  <p className="title font-sans bold text-white transition delay-150 ease-out cursor-pointer hover:text-red-600">
                    {item.title}{" "}
                    {item.list !== undefined && (
                      <MdArrowDropDown className=" inline text-lg " />
                    )}
                  </p>
                </Link>
                {item.list !== undefined && (
                  <div
                    className=" z-20 cate absolute w-[32rem] w-full h-auto bg-zinc-full p-2 left-0 text-white "
                    style={{ width: "200%" }}
                  >
                    <ul>
                      {Object.keys(item.list).map((cate, index) => (
                        <Link
                          to={`category/${
                            item.title === "MOVIE" || item.title === "TVSHOW"
                              ? `${item.title.toLowerCase()}/${cate}/page/1`
                              : `${cate}/page/1`
                          }`}
                          key={index}
                        >
                          <li
                            // key={`${item.title}-${index}`}
                            className=" mb-2 hover:text-red-600 text-white cursor-pointer"
                          >
                            <BiRightArrow className=" inline text-sm" />
                            {item.list[cate]}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className=" w-1/4 flex hidden lg:block justify-end">
          <form
            className=" w-3/4 w-full  "
            onSubmit={(e) => {
              e.preventDefault();
              SubmitSearch();
            }}
          >
            <input
              className=" w-full h-10 border-2 bo p-2 "
              type="text"
              placeholder="Search something..."
              value={searchKey}
              onChange={onChangeForm}
            ></input>
          </form>
        </div>
        {!showSearch ? (
          <span
            className=" text-white block text-2xl lg:hidden"
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <BiSearch />
          </span>
        ) : (
          <span
            className=" text-red-600 block text-2xl lg:hidden"
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          >
            <AiOutlineClose />
          </span>
        )}
      </div>
      {showSearch && (
        <div>
          <form
            className="w-full bg-zinc-full text-white"
            onSubmit={(e) => {
              e.preventDefault();
              SubmitSearch();
            }}
          >
            <input
              className="  w-full h-12 bg-zinc-full text-lg  p-2 active:border-0 "
              type="text"
              placeholder="Search something ..."
              value={searchKey}
              onChange={onChangeForm}
            ></input>
          </form>
        </div>
      )}
      {showMenu && (
        <div className=" w-full bg-zinc-full text-white font-roboto ">
          {data.map((item) => (
            <div
              key={item.id}
              className=" h-auto border-b-0.5 border-gray-200 p-3 flex flex-col justify-center"
            >
              <Link
                to={
                  item.title !== "CATEGORY" &&
                  `category/${
                    item.title === `TOPIMDB`
                      ? `rating`
                      : item.title === `HOT`
                      ? `trending`
                      : item.title.toLowerCase()
                  }/page/1`
                }
              >
                <h3
                  className=" font-semibold text-lg"
                  onClick={() => {
                    setShowMenu(!showMenu);
                  }}
                >
                  {item.title}
                </h3>
              </Link>
              {item.list !== undefined && (
                <div className=" grid grid-cols-2 gap-1 mt-2">
                  {Object.keys(item.list).map((cate, index) => (
                    <div className="mb-1" key={index}>
                      <Link
                        to={`category/${
                          item.title === "MOVIE" || item.title === "TVSHOW"
                            ? `${item.title.toLowerCase()}/${cate}/page/1`
                            : `${cate}/page/1`
                        }`}
                      >
                        <p
                          onClick={() => {
                            setShowMenu(!showMenu);
                          }}
                        >
                          - {item.list[cate]}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
