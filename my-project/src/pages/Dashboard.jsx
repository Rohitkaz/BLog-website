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
  return (
    <>
      <div className="w-screen md:h-dvh  bg-gray-300 ">
        <Header />
        <div className=" flex flex-col w-[screen]   ">
          <Dashboardheader />
        </div>
        <div className=" flex md:flex-row flex-col w-[screen] h-[85%] md:gap-8 gap-4  ">
          <div className=" ml-[1%] flex flex-col md:w-[40%] w-[100%]  h-[100%]   ">
            <div className=" ml-[2%]  font-heading font-extrabold  text-lg md:text-2xl flex flex-row items-center gap-2">
              Welcome Back! {username}
              <PiHandWavingFill className=" " />
            </div>
            <div className=" ml-[2%]  font-heading font-bold  text-lg md:text-2xl flex items-center">
              Latest comments
            </div>
            <div className="w-[96%]  flex flex-wrap shadow-lg rounded-lg md:w-[100%]   min-h-[400px] max-h-[400px] md:min-h-[80%] md:ml-[2%] ml-[1%]  overflow-y-scroll scrollbar-track-slate-400 gap-[4%] md:gap-0.5 ">
              {data.length > 0 ? (
                <>
                  {data.map((comment, index) => (
                    <div className="w-[96%] shadow-lg rounded-lg border-2 border-white h-[35%] md:h-[30%]  flex flex-row m-[1%] p-2 ">
                      <div className="w-[80%]  h-[100%]  flex flex-col justify-center gap-1">
                        <div className="w-[60%]  h-[60%] items-center   gap-2 flex flex-row">
                          <img
                            src="/images/user.png"
                            className="w-[20%]  h-[60%]"
                          ></img>
                          <div className=" flex flex-col ">
                            <div className="font-heading font-bold">
                              {comment.username}
                            </div>

                            <div className="font-heading font-bold">
                              {comment.createdAt}
                            </div>
                          </div>
                        </div>
                        <div className="font-heading font-bold  h-[40%] line-clamp-1 ">
                          {comment.content}
                        </div>
                      </div>
                      <div className=" h-full md:mt-0 mt-2 z-2  flex items-center justify-center ">
                        <Link
                          to={`/Blog/${comment.postId}`}
                          className="p-1 text-center hover:text-green-600   rounded-md  border-2 bg-slate-400 font-bold font-heading shadow-lg"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-[100%] min-h-[400px] flex items-center justify-center font-heading font-bold">
                  no comments
                </div>
              )}
            </div>
          </div>
          <div className=" w-[94%] ml-2 md:ml-0 flex-col flex md:h-[80%] h-dvh md:mt-[5%]  p-4 gap-4 md:w-[55%] rounded-lg border-white md:border-2">
            <div className="flex flex-col gap-2 items-center justify-center w-[80%]  md:w-[40%] h-[40%] border-2 border-white rounded-lg font-heading font-bold text-2xl">
              <div className="  w-[20%] ">
                <img
                  src="/images/user1.png"
                  className=" w-full object-cover "
                ></img>
              </div>
              <div className="w-full flex justify-center">
                <h1 className="text-center font-heading font-bold text-2xl">
                  {username}
                </h1>
              </div>
            </div>
            <div className="w-full md:h-[42%] h-[50%] flex flex-col  md:flex-row md:p-2  gap-3 font-heading font-bold">
              <div className=" md:h-full h-[32%] border-white border-2 w-[80%] md:w-[30%] flex flex-col md:gap-4 gap-2 rounded-lg p-2">
                <div className=" w-full h-[30%] flex flex-row  md:gap-2 items-center ">
                  <h1 className="text-lg">Comments</h1>
                  <FaComments className=" h-full  w-full" />
                </div>

                <h1 className="w-full text-xl md:text-2xl ml-2">
                  {userdata.totalComments}
                </h1>
              </div>
              <div className=" md:h-full h-[32%] border-white border-2 w-[80%] md:w-[30%] flex flex-col md:gap-4 gap-2 rounded-lg p-2">
                <div className=" w-full h-[30%] flex flex-row  md:gap-2 items-center ">
                  <h1 className="text-lg">Views</h1>
                  <FaUser className=" h-full  w-full" />
                </div>

                <h1 className="w-full text-xl md:text-2xl ml-2">
                  {userdata.totalViews}
                </h1>
              </div>
              <div className=" md:h-full h-[32%] border-white border-2 w-[80%] md:w-[30%] flex flex-col md:gap-4 gap-2 rounded-lg p-2">
                <div className=" w-full h-[30%] flex flex-row  md:gap-2 items-center ">
                  <h1 className="text-lg">Likes</h1>
                  <FaHeart className=" h-full  w-full" />
                </div>

                <h1 className="w-full text-xl md:text-2xl ml-2">
                  {userdata.totalLikes}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
