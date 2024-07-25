import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
import NewBlogCard from "./Newblogcard";
import Header from "./Header";
const Allblog = () => {
  const post = useLoaderData();

  return (
    <>
      <div className=" flex flex-col w-[screen] h-dvh  ">
        <Header />
        <div className="flex mt-[40px]  md:flex-wrap flex-col gap-[2%]  md:flex-row w-screen h-[90%]  border-2 border-gray-50  ">
          {post.map((blog, index) => (
            <div className="flex w-[90%] md:w-[23%] md:ml-[0px] ml-[5%] h-[70%] gap-[3%] ">
              <NewBlogCard blogdata={blog} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Allblog;
