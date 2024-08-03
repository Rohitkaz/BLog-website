import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Header from "./Header";
import Dashboardheader from "./Dashboardheader";
const Allblog = () => {
  const post = useLoaderData();

  return (
    <>
      <div className=" flex flex-col w-[screen] min-h-screen bg-gray-200 ">
        <Header />
        <Dashboardheader />
        {post.length > 0 ? (
          <div className="flex   flex-wrap  gap-8 justify-center md:justify-start md:ml-4  md:flex-row w-screen h-[90%]    ">
            {post.map((blog, index) => (
              <Card blogdata={blog} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col w-screen h-[100%]  items-center gap-2 justify-center">
            <h1 className="font-heading text-4xl">NO BLOGS</h1>
            <Link
              to="/newblog"
              className=" bg-purple-600 font-heading text-xl p-2 font-bold rounded-lg transition-all ease-out hover:-translate-y-1 duration-300 shadow-lg"
            >
              CREATE BLOG
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Allblog;
