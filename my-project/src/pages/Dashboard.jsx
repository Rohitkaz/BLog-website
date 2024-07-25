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
import { FaUser, FaUsers } from "react-icons/fa";
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
      <Header />
      <div className=" flex flex-col w-[screen]   ">
        <Dashboardheader />
      </div>
      <div className=" flex md:flex-row flex-col w-[screen] h-dvh md:gap-8 gap-4  ">
        <div className=" ml-[1%] flex flex-col md:w-[40%] w-[100%]  h-[100%]  ">
          <div className=" ml-[2%]  font-heading font-extrabold  text-lg md:text-2xl flex flex-row items-center gap-2">
            Welcome Back!
            <PiHandWavingFill className=" " />
          </div>
          <div className=" ml-[2%]  font-heading font-bold  text-lg md:text-2xl flex items-center">
            Latest comments
          </div>
          <div className="w-[96%] flex-wrap shadow-lg rounded-lg md:w-[100%] border-2 border-grey h-[100%] md:h-[70%] md:ml-[2%] ml-[1%] position-fixed overflow-y-scroll scrollbar-thin gap-[4%] md:gap-[2%] ">
            {data.length > 0 ? (
              <>
                {data.map((comment, index) => (
                  <div className="w[96%] shadow-lg rounded-lg border-2 border-grey h-[35%] md:h-[30%]  flex flex-row m-[1%] ">
                    <div className="w-[80%]  h-[100%]  flex flex-col justify-center gap-1">
                      <div className="w-[80%]  h-[60%] items-center   gap-2 flex flex-row">
                        <img
                          src="./images/user.png"
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
                      <div className="font-heading font-bold  h-[40%] ">
                        {comment.content}
                      </div>
                    </div>
                    <div className="w-[20%]  h-[100%] flex items-center justify-center ">
                      <Link
                        to={`/Blog/${comment.postId}`}
                        className="w-[60%] md:w-[70%] text-center hover:text-green-600   rounded-md  border-2 bg-slate-400 font-bold font-heading shadow-lg"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-[100%] h-[100%] flex items-center justify-center">
                no comments
              </div>
            )}
          </div>
        </div>
        <div className="md:ml-0 ml-[2%] w-[96%] md:w-3/4  border-2 h-[70%] md:mt-[4.5%] shadow-lg rounded-md flex flex-col gap-4 ">
          <div className=" flex flex-col mt-4 w-[40%] gap-3 border-2 h-[50%] ml-[5%] md:ml-[10%] rounded-lg shadow-lg shadow-slate-400">
            <img
              src="./images/user.png"
              className="w-[20%]  h-[40%] ml-[40%] mt-4"
            ></img>
            <div className=" flex flex-row font-heading justify-center font-bold text-2xl ">
              {username}
            </div>
          </div>
          <div className=" flex  w-full   h-[40%]">
            <div className="flex flex-col gap-2   w-[27%] md:w-[30%]  border-2 h-[80%] ml-[2%] md:ml-[10%] rounded-lg shadow-lg shadow-slate-400">
              <div className=" flex mt-4 gap-4 md:gap-7  text-slate-600 flex-row font-heading justify-center font-bold text-xl md:text-2xl">
                Views
                <div className=" flex mt-1   ">
                  <FaUser />
                </div>
              </div>
              <div className=" flex flex-row font-heading justify-center font-bold text-2xl ">
                {userdata.totalViews}
              </div>
            </div>
            <div className=" flex flex-col  w-[27%] md:w-[30%]  border-2 h-[80%] ml-[5%] md:ml-[10%] rounded-lg shadow-lg shadow-slate-400">
              <div className=" flex mt-4 gap-4 md:gap-7  text-slate-600 flex-row font-heading justify-center font-bold text-xl md:text-2xl ">
                Likes
                <div className=" flex mt-1   ">
                  <FaRegHeart />
                </div>
              </div>
              <div className=" flex flex-row font-heading justify-center font-bold text-2xl ">
                {userdata.totalLikes}
              </div>
            </div>
            <div className=" flex flex-col  w-[33%] md:w-[30%]  border-2 h-[80%] ml-[5%] md:ml-[10%] rounded-lg shadow-lg shadow-slate-400">
              <div className=" flex mt-4 gap-2 md:gap-7  text-slate-600 flex-row font-heading justify-center font-bold text-lg md:text-2xl ">
                Comments
                <div className=" flex mt-1   ">
                  <FaComments />
                </div>
              </div>
              <div className=" flex flex-row font-heading justify-center font-bold text-2xl ">
                {userdata.totalComments}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
