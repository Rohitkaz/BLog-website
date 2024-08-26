import React from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useState } from "react";
import Card from "./Card";
import CardC from "./CrouselCard";
const Slider = ({ popularpost, trending }) => {
  console.log(popularpost);
  console.log(trending);
  const [current, setCurrent] = useState(0);

  const lefttranslate = () => {
    if (current === 0) {
      setCurrent(popularpost.length - 1);
    } else setCurrent(current - 1);
  };
  const Righttranslate = () => {
    if (current === popularpost.length - 1) {
      setCurrent(0);
    } else setCurrent(current + 1);
  };
  return (
    <div className="w-[100%]  flex  flex-col pl-4 lg:pl-10  lg:flex-row gap-10   bg-gray-200 
    ">
      <div className=" flex flex-col ml-2   w-[100%] md:w-[95%] lg:w-[60%] ">
        <h1 className="font-heading font-bold text-4xl  ">| Popular Blogs</h1>
        <div className="flex  border-2 mt-4 border-gray-700  overflow-hidden relative  md:w-full w-[94%] h-[500px]  rounded-lg shadow-xl ">
          <div
            className={`   flex flex-row  gap-4 p-2 items-center  over-x-scroll scrollbar-hidden  w-[100%]   transition-all ease-out duration-300

           `}
            style={{ transform: ` translateX(-${current * 100}%)` }}
          >
            {popularpost.map((item) => (
              <CardC blogdata={item} />
            ))}
          </div>
          <div className=" flex flex-row absolute top-[47%] md:gap-[580px] w-full justify-between   ">
            <button onClick={lefttranslate} className="">
              <BsFillArrowLeftCircleFill className="w-[30px] h-[30px]" />
            </button>
            <button onClick={Righttranslate} className="pr-2">
              <BsFillArrowRightCircleFill className="w-[30px] h-[30px] right-2" />
            </button>
          </div>
        </div>
      </div>
      <div className="   lg:ml-7">
        <h1 className="  ml-4  font-heading font-bold text-4xl ">
          | Trending Blogs
        </h1>
        <div className=" md:mt-4 flex  gap-4 lg:h-[500px] lg:w-[350px] w-[100%] md:pt-4 flex-wrap overflow-x-hidden   mt-3.5 lg:flex-nowrap justify-center  md:justify-start md:items-center    lg:flex-col  lg:overflow-y-scroll lg:border-2  border-gray-700  lg:scrollbar-track-teal-400    rounded-lg ">
          {trending.map((item) => (
            <Card blogdata={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Slider;
