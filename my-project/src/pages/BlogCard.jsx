import React, { useState } from "react";
const BlogCard = ({ blogdata }) => {
  return (
    <div className=" flex flex-col gap-1 w-[80%] sm:w-[17%]  h-[80%] rounded-lg rounded-t-lg  bg-orange-300 shadow-2xl shadow-gray-400 z-10">
      <img
        src={`images/${blogdata.image}`}
        className="w-[100%] h-[50%] rounded-t-lg "
      ></img>
      <p className=" w-[100%] h-[8%] text-center font-heading font-extrabold text-xl">
        {blogdata.maintitle}
      </p>
      <p
        className="  w-[100%] h-[22%] text-start font-heading text-base ml-1
          line-clamp-3 text-wrap "
      >
        {blogdata.description}
      </p>
      <div className=" flex flex-row w-[100%] h-[13%] font-heading font-semibold text-center mt-2 gap-2 ">
        <img
          className="h-[100%] w-[20%]  rounded-[47%] object-cover ml-2 "
          src="images/1717570878299download.jpeg"
        ></img>
        <p className="h-[100%] text-   pt-2 ">{blogdata.author}</p>
      </div>
    </div>
  );
};
export default BlogCard;
