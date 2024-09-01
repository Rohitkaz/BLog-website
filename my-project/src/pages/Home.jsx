import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import LoadingIcons from "react-loading-icons";
import { MdElectricalServices } from "react-icons/md";

import React from "react";
import { Await } from "react-router-dom";
import Slider from "./Slider";
import Card from "./Card";

const Home = () => {
  const data = useLoaderData();
 
  return (
    <>
      <React.Suspense
        fallback={
          <div className="font-heading text-2xl">Loading please wait...</div>
        }
      >
        <Await resolve={data.res}>
          {(res) => {
            const Latestpost = res.data.Latestpost;
            console.log(Latestpost);
            const Trending = res.data.Trending;
            const Popularpost = res.data.Popularpost;

            return (
              <>
                <div className="flex flex-col w-screen  md:h-screen overflow-x-hidden  bg-gray-200 overflow-y-scroll scrollbar-track-stone-100   ">
                  
                  <div className=" w-[100%] mt-[45px] ">
                    <Slider popularpost={Popularpost} trending={Trending} />
                  </div>

                  <div className="flex-col   w-full md:ml-2 lg:ml-10 md:mt-5 mt-5  ">
                    <h1 className="font-heading font-bold text-4xl text-blue-900 ml-3">
                      | Latest Blogs
                    </h1>
                    <div className=" flex  flex-wrap w-full justify-center md:justify-start md:mt-4  gap-8 md:gap-4 lg:gap-8">
                      {Latestpost.map((item) => (
                        <Card blogdata={item} />
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </>
  );
};
export default Home;
