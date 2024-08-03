import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { AiTwotoneLike } from "react-icons/ai";
import CommentBar from "./comment";
import { IoEyeOutline } from "react-icons/io5";
import { LiaCommentSolid } from "react-icons/lia";
import { useAuthcontext } from "./context";
const ShowBlogPage = () => {
  const blogdata = useLoaderData();

  const blog = blogdata.blog;
  const userlike = blogdata.userlike;
  const [comments, setComments] = useState(blog.comments);
  const [showcommentbar, setShowcommentbar] = useState(false);
  const [isLiked, setisLiked] = useState(userlike);
  const context = useAuthcontext();
  console.log(isLiked);

  const [likes, setLikes] = useState(blog.likes);

  const Comms = () => {
    console.log("hillos");
    setComments((prev) => prev + 1);
  };
  const deccomment = () => {
    console.log("deccoment");
    setComments((prev) => prev - 1);
  };
  const likeBlog = async () => {
    //  console.log(isLiked);
    if (!context.user) {
      return alert("Login to like blogs");
    }
    if (context.user.name === blog.author) {
      return alert("you cannot like your own blog");
    }
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
    <div className=" flex flex-row   justify-center    w-[100%] ">
      <div
        className={`flex  flex-col  md:max-w-[700px] w-[94%] min-h-dvh bg-gray-200 p-4 gap-7 ${
          showcommentbar ? "blur-sm fixed" : "blur-none absolute"
        }   gap-2 border-2 `}
      >
        <h1 className=" font-bold md:text-5xl text-4xl">{blog.maintitle}</h1>

        <div className="w-full  flex flex-row gap-4">
          <div className="w-[50px] h-[50px] ">
            <img
              src="/images/user.png"
              className="w-full h-full object-cover "
            ></img>
          </div>
          <div className="h-[50px] flex flex-col">
            <h2 className="font-heading">{blog.author}</h2>
            <h2 className="font-heading">{blog.createdAt}</h2>
          </div>
        </div>
        <div className="flex flex-row w-full gap-4 h-[50px] border-t-2 border-b-2 border-white p-4">
          <div className="flex flex-row h-full justify-center items-center gap-1  ">
            <IoEye className="h-[20px] w-[30px]" />
            <h1>{blog.views}</h1>
          </div>
          <div className="flex flex-row h-full justify-center items-center gap-1  ">
            <AiTwotoneLike
              onClick={likeBlog}
              className="h-[20px] w-[30px] hover:bg-gray-600"
            />
            <h1>{likes}</h1>
          </div>
          <div className="flex flex-row h-full justify-center items-center gap-1   ">
            <LiaCommentSolid
              onClick={showcommbar}
              className="h-[20px] w-[30px] hover:bg-gray-600 rounded-sm"
            />
            <h1>{comments}</h1>
          </div>
        </div>
        <div classname=" w-full border-b-2    ">
          <img
            src={`http://localhost:8000/images/${blog.image}`}
            className="w-full max-h-[400px] object-cover rounded-lg "
          ></img>
        </div>
        <hr className="border-black border-2"></hr>
        <div className="flex flex-col w-full gap-2 ">
          <h1 className=" font-bold md:text-5xl text-4xl">
            This is the Title of blog
          </h1>
          {blog.content.map((para, ind) => (
            <>
              <h1 className=" w-full  font-heading font-bold ">{para.title}</h1>

              <div className=" w-full font-heading">{para.text}</div>
            </>
          ))}
        </div>
      </div>
      <div
        className={` w-[90%]  md:w-[40%] ml-[10%] bg-gray-400  rounded-lg md:ml-[60%]  z-10 border-2 ${
          showcommentbar ? "border-black" : "border-none"
        } fixed `}
      >
        {showcommentbar ? (
          <div>
            <MdClose
              className=" h-[10%] w-[10%] md:h-[5%]  md:w-[5%] ml-[90%]"
              onClick={closecommbar}
            />
            <CommentBar
              blogid={blog._id}
              change={Comms}
              deccomment={deccomment}
              blogauthor={blog.author}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ShowBlogPage;
