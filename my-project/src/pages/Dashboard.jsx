import React from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Header from "./Header";
import { Link } from "react-router-dom";
import { RiFileList3Fill } from "react-icons/ri";
import { Navigate } from "react-router-dom";
import { PiHandWavingFill } from "react-icons/pi";
import { MdSignalCellularNodata } from "react-icons/md";
import axios from "axios";
const Dashboard = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const logout = async () => {
    const result = await axios.get(
      "http://localhost:8000/Auth/logout",

      {
        withCredentials: true,
      }
    );
    navigate("/Login");
  };

  return (
    <>
      <Header />
      <div className=" flex flex-col w-[screen] h-dvh">
        <nav className="flex  flex-row w-[screen] justify-between md:justify-start h-[42px] items-center font-heading list-none md:gap-4  font-bold border-2 border-stone-400">
          <li className="hover:text-green-600 pl-[1%] ">
            <Link>Dashboard</Link>
          </li>
          <li className="hover:text-green-600">
            <Link to="/yourblog">Your Blogs</Link>
          </li>
          <li className="hover:text-green-600">
            <Link to="/newblog">New Blog</Link>
          </li>
          <button onClick={logout} className="hover:text-green-600">
            Logout
          </button>
        </nav>
        <div className=" ml-[1%]  fond-heading font-bold text-2xl flex flex-row items-center gap-2">
          Welcome Back!
          <PiHandWavingFill className=" " />
        </div>
        <div className=" ml-[2%]  fond-heading font-bold text-2xl flex items-center">
          Latest comments
        </div>
        <div className="w-[96%] md:w-[40%] border-2 border-grey h-[70%] ml-[2%]  position-fixed overflow-y-scroll scrollbar-thin gap-[2%] ">
          {data.length > 0 ? (
            <>
              {data.map((comment, index) => (
                <div className="w[96%] border-2 border-grey h-[25%]  flex flex-row m-[1%] ">
                  <div className="w-[80%]  h-[100%]  flex flex-col justify-center gap-1">
                    <div className="font-heading">{comment.username}</div>
                    <div className="font-heading">{comment.content}</div>
                  </div>
                  <div className="w-[20%]  h-[100%] flex items-center justify-center ">
                    <button className="w-[50%] md:w-[50%]  border-2 border-grey rounded-md bg-blue-700 text-white">
                      view
                    </button>
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
    </>
  );
};
export default Dashboard;
