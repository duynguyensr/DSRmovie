import React from "react";

const Footer = () => {
  return (
    <div className=" shadow-md border-t-2 border-opacity-20 p-6 w-full h-auto  bg-zinc-full text-white flex flex-col lg:flex-row items-center justify-between lg:justify-between">
      <h1 className=" text-center text-red-600 text-3xl font-bold font-sans">
        <span className="text-white">DSR</span>movies
      </h1>
      <h6 className=" text-center font-roboto font-medium transform duration-200 ease-in cursor-pointer hover:text-red-600 hover:border-red-600 ">
        <a
          href="https://glistening-khapse-bd5ab7.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          Another project
        </a>
      </h6>
      {[
        "Support website",
        "Phone: (+84) 077 9050 975",
        "Email: duyquangsr@gmail.com",
      ].map((item) => (
        <h6
          key={item}
          className=" text-center font-roboto font-medium transform duration-200 ease-in cursor-pointer hover:text-red-600 hover:border-red-600 "
        >
          {item}
        </h6>
      ))}
    </div>
  );
};

export default Footer;
