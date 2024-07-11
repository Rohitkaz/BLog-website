import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
import Header from "./Header";
const Allblog = () => {
  const post = useLoaderData();

  return (
    <>
      <Header />
      <div className="flex flex-col w-screen h-dvh    ">
        <div className="flex flex-col place-items-center md:place-items-start md:flex-wrap   md:flex-row sm:flex-row sm:flex-wrap w-[100%]  h-[77%] gap-8 p-5 ">
          {post.map((blog, index) => (
            <BlogCard blogdata={blog} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Allblog;
