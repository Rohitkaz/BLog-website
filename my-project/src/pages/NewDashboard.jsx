import React from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Link } from "react-router-dom";
import { RiFileList3Fill } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import { PiHandWavingFill } from "react-icons/pi";
import { MdSignalCellularNodata } from "react-icons/md";
import { useAuthcontext } from "./context";
import Dashboardheader from "./Dashboardheader";
import { FaHeart, FaUser, FaUsers } from "react-icons/fa";
import { FaComments } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import axios from "axios";
const Dashboard = () => {
  const data1 = useLoaderData();
  
  const data = data1.latestcomment;
  const userdata = data1.userdata;
  const navigate = useNavigate();
  const context = useAuthcontext();
  const username = data1.username;
  const usernamefirstletter=username.slice(0,1);
  

  return (
    <>
      <div className="w-screen   ">
        <Header />
        <div className=" flex flex-col w-[full]    ">
          <Dashboardheader />
        </div>
        <div className="p-6 flex flex-col gap-8  ">
       <div className="flex flex-row gap-2"> <h1 className="font-bold text-2xl text-gray-400">Welcome Back! </h1><h1 className="font-bold font- text-blue-900 text-2xl"> {username} </h1>
       <PiHandWavingFill className="text-2xl text-yellow-500 mt-1" />
       </div>
       <h1 className="text-2xl font-bold">Overview</h1>
       <div className="flex flex-col  lg:flex-row w-[99%] gap-8 ">
        <div className=" flex flex-col items-center rounded-lg lg:w-[30%] w-[100%] border-2 p-6 gap-4">
          <div className=" text-5xl font-bold w-[100px] h-[100px] flex items-center justify-center text-white bg-blue-600 rounded-full">
            {usernamefirstletter}
          </div>
          <div className="p-2 flex flex-col items-center ">
          <h1 className="text-2xl">{username}</h1>
          <h1 className="">Author/Writer</h1>
          </div>
          <div className="flex flex-row gap-10">
<h1 className="text-2xl font-bold">{userdata.totalBlogs}</h1>
<h1 className="font-bold mt-1">Total Blogs</h1>
          </div>
        </div>

        <div className="gap-5   flex flex-wrap     lg:w-[65%]  w-[100%] h-[15%] ">
        <div className="lg:p-8 p-5 h-full border-2 rounded-lg md:w-[30%] w-full ">
        <div className="flex flex-row justify-between w-full">
            <h1 className="text-xl font-bold">Likes</h1>
            <FaHeart className="text-xl text-red-700 "  />
        </div>
        <h1 className="text-3xl mt-3  text-blue-600 font-bold"> {userdata.totalLikes}</h1>
        </div>
         <div className="lg:p-8 p-5  h-full border-2 rounded-lg md:w-[30%] w-full ">
        <div className="flex flex-row justify-between w-full">
            <h1 className="text-xl font-bold">Views</h1>
            <FaUser className="text-xl text-gray-400"  />
        </div>
        <h1 className="text-3xl mt-3  text-blue-600 font-bold"> {userdata.totalViews}</h1>
        </div>
      
        
        <div className="lg:p-8 p-5  h-full border-2 rounded-lg md:w-[30%] w-full ">
        <div className="flex flex-row justify-between w-full">
            <h1 className="text-xl font-bold">Comments</h1>
             <FaComments className="text-xl text-gray-400"  />
        </div>
        <h1 className="text-3xl mt-3  text-blue-600 font-bold"> {userdata.totalComments}</h1>
        </div>
        
       </div>
       </div>
       
       <h1 className=" text-2xl font-bold ">
              Latest comments
          </h1>
            <div className=" md:w-[50%] overflow-y-auto  lg:w-[40%] w-[100%] flex flex-col p-2 gap-4 border-2 rounded-lg min-h-[400px] max-h-[400px]">
              {data.length > 0 ? (
                <>
                  {data.map((comment, index) => (
                   <div className="p-4 pr-8 flex flex-row border-2 justify-between rounded-lg">
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                     <div className="w-[40px] h-[40px] rounded-full bg-blue-700 text-white flex justify-center items-center  ">
                  { comment.username.slice(0,1)}
                     </div>
                     <div className="flex items-center ">{comment.username}</div>
                     </div>
                     <h1>{comment.content}</h1>
                    </div>
                    <div className="flex flex-col gap-4">
                       <h1>{comment.createdAt}</h1>
                       <Link
                          to={`/Blog/${comment.postId}`}
                          className="p-1 bg-purple-600 text-white text-center rounded-lg hover:translate-x-1 transition-all ease-in-out duration-100"
                        >
                          View
                        </Link>
                    </div>
                   </div>
                  ))}
                </>
              ) : (
                <div className="w-[100%] min-h-[400px] flex items-center justify-center font-heading font-bold">
                  No comments To Show
                </div>
              )}
            </div>
        </div>
        
        </div>
    </>
  );
};
export default Dashboard;
