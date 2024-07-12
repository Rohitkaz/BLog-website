import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { AiTwotoneLike } from "react-icons/ai";
import CommentBar from "./comment";
import { IoEyeOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
const ShowBlogPage = () => {
  const blogdata = useLoaderData();
  const blog = blogdata.blog;
  const userlike = blogdata.userlike;
  const [comments, setComments] = useState(blog.comments);
  const [showcommentbar, setShowcommentbar] = useState(false);
  const [isLiked, setisLiked] = useState(userlike);

  console.log(isLiked);

  const [likes, setLikes] = useState(blog.likes);
  const date = new Date(blog.createdAt).toDateString();
  blog.createdAt = date;
  const Comms = () => {
    console.log("hillos");
    setComments((prev) => prev + 1);
  };
  const likeBlog = async () => {
    //  console.log(isLiked);
    if (isLiked == false) {
      console.log("hi");

      try {
        const res = await axios.get(`http://localhost:8000/like/${blog._id}`, {
          withCredentials: true,
        });
        setisLiked(true);
        setLikes(likes + 1);
        set;
        console.log(likes);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("hello");
      try {
        const res = await axios.get(
          `http://localhost:8000/dislike/${blog._id}`,
          {
            withCredentials: true,
          }
        );
        setisLiked(false);
        setLikes(likes - 1);
        console.log(likes);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  const showcommbar = () => {
    setShowcommentbar(true);
  };
  const closecommbar = () => {
    setShowcommentbar(false);
  };
  console.log(blog.content);
  return (
    <div className=" flex flex-row     w-[100%]  ">
      <div
        className={`flex flex-col w-[70%] ${
          showcommentbar ? "blur-sm fixed" : "blur-none absolute"
        }   gap-2 border-2 ml-[15%]`}
      >
        <div className="flex justify-center font-heading font-bold text-4xl">
          {blog.maintitle}
        </div>
        <div className="w-[100%] flex justify-evenly font-heading font-bold text-red-700">
          <div> BY-{blog.author}</div>
          <div> {blog.createdAt}</div>
        </div>
        <div className="w-[100%] flex  font-heading gap-7  md:ml-[3%] justify-evenly md:justify-normal   ">
          <div className="flex flex-row font-heading ">
            <IoEyeOutline className="w-[30px] h-[20px] ml-[10%]  " />
            <div className="flex text-center  mt-[-2px]">{blog.views}</div>
          </div>
          <div className="flex flex-row font-heading">
            <AiTwotoneLike
              onClick={likeBlog}
              className={`w-[30px] h-[20px] hover:text-green-500 ${
                isLiked ? "text-red-600" : null
              }`}
            />
            <div className="flex text-center  mt-[-2px]">{likes}</div>
          </div>
          <div className="flex flex-row font-heading">
            <LiaCommentSolid className="w-[30px] h-[20px]" />
            <div className="flex text-center  mt-[-2px]">{comments}</div>
          </div>
        </div>
        <img
          src={`http://localhost:8000/images/${blog.image}`}
          className="w-[96%] h-[50%] ml-[2%] rounded-md "
        ></img>
        <div className="flex flex-col w-[100%] h- font-heading">
          {blog.content.map((para, ind) => (
            <>
              <div className=" w-[100%] text-wrap font-flow font-bold text-[25px] ">
                {para.title}
              </div>

              <div className=" w-[100%] text-wrap font-heading font-bold text-cyan-700 text-[19px]">
                {para.text}
              </div>
            </>
          ))}
        </div>
        <button
          onClick={showcommbar}
          className="font-heading text-xl bg-blue-800 text-white rounded"
        >
          Comments
        </button>
      </div>
      <div
        className={` w-[65%]  md:w-[40%] ml-[35%] md:ml-[60%] z-10 border-2 ${
          showcommentbar ? "border-red-600" : "border-none"
        } fixed `}
      >
        {showcommentbar ? (
          <div>
            <MdClose
              className="  h-[5%] w-[5%] ml-[90%]"
              onClick={closecommbar}
            />
            <CommentBar
              blogid={blog._id}
              change={Comms}
              blogauthor={blog.author}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ShowBlogPage;
