import React, { useState } from "react";
import { Link } from "react-router-dom";
const BlogCard = ({ blogdata }) => {
  return (
    <div className=" flex flex-col gap-1 w-[75%] sm:w-[23%]  h-[90%] md:[80%] rounded-lg rounded-t-lg  bg-orange-300 shadow-2xl shadow-gray-400 z-7">
      <img
        src={`images/${blogdata.image}`}
        className="w-[100%] h-[50%] rounded-t-lg "
      ></img>
      <Link
        to={`/Blog/${blogdata._id}`}
        className=" w-[100%] h-[15%] text-center font-heading font-bold md:text-xl  "
      >
        {blogdata.maintitle}
      </Link>
      <p
        className="  w-[100%] h-[13%] text-start font-heading text-base ml-1
          line-clamp-2 text-wrap "
      >
        {blogdata.description}
      </p>
      <div className=" flex flex-row w-[100%] h-[13%] font-heading font-semibold text-center mt-2 gap-2 ">
        <img
          className="h-[100%] w-[20%]  rounded-[47%] object-cover ml-2 "
          src="images/user.png"
        ></img>
        <p className="h-[100%] text-   pt-2 ">{blogdata.author}</p>
      </div>
    </div>
  );
};
export default BlogCard;
