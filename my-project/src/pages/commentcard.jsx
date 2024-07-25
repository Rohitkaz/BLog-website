import React from "react";
import { useState } from "react";

import axios from "axios";
import Header from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

const Commentcard = ({ comment, index, change }) => {
  const [clikes, setClikes] = useState(comment.likes);
  const [isTrue, setIsTrue] = useState(false);
  const [reply, setReply] = useState();
  const [replyindex, setReplyindex] = useState();
  const [showreplies, setShowreplies] = useState(false);
  const [showreplyindex, setShowreplyindex] = useState();
  const [replies, setReplies] = useState([]);
  const sendReply = async (e) => {
    if (!reply) {
      return alert("reply cannot be empty");
    }
    const comm = {
      blog_id: comment.postId,
      commentid: e.target.id,
      commreply: reply,
      parentUsername: comment.username,
    };
    console.log(comment.postId);
    try {
      const res = await axios.post(`http://localhost:8000/reply`, comm, {
        withCredentials: true,
      });

      change(res.data, comment.parentId, index);
    } catch (err) {
      console.log(err.message);
    }
  };
  const setlike = () => {
    setClikes((prev) => prev + 1);
  };
  const likecomment = async () => {
    const commentid = comment._id;
    try {
      const res = await axios.post(
        `http://localhost:8000/likecomments`,
        { commentid: commentid },
        {
          withCredentials: true,
        }
      );
      if (res.data == "like") setlike();
      if (res.data == "dislike") setClikes((prev) => prev - 1);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="flex flex-col items-center w-[100%] h-[90%] gap-1   ">
      <div className="flex flex-row w-[87%] gap-2">
        <img className="w-[30px] h-[30px]" src="./images/user.png"></img>
        <div className="flex flex-row w-[90% ] h-[10%]  font-heading text-sm font-bold gap-2">
          <div>{comment.username}</div>
          {comment.parentUsername ? (
            <div className="text-blue-700">@{comment.parentUsername}</div>
          ) : null}
        </div>
      </div>
      <div className="  font-heading w-[87%]  border-2 border-gray-500 rounded-md mt-2">
        {comment.content}
      </div>
      <div className="flex flex-row w-[87%] font-heading justify-between ">
        <button
          onClick={likecomment}
          className="md:w-[20%] w-[30%] bg-blue-700 text-white hover:text-green-400"
        >
          Like({clikes})
        </button>
        <div className=" flex md:w-[20%] w-[40%] bg-blue-700 flex-row justify-center items-center border-2  ">
          <label className="text-white hover:text-green-600">Reply</label>
          {isTrue ? (
            <IoIosArrowUp
              className="  w-[30%]  items-center"
              onClick={() => {
                setIsTrue(false);
                setReplyindex(-1);
              }}
            />
          ) : (
            <FaAngleDown
              id="up"
              className=" w-[30%]  items-center"
              onClick={() => {
                setIsTrue(true);
                setReplyindex(index);
              }}
            />
          )}
        </div>
      </div>
      <div
        className={`flex w-[87%] h-[40%] transition-opacity duration-500 ${
          isTrue ? "opacity-100" : "opacity-0"
        }`}
      >
        {isTrue && replyindex === index ? (
          <div className="flex flex-col w-[100%] h-[100%] justify-items-start ">
            <textarea
              className={`border-2 border-gray-500 font-heading w-[100%] h-[100%] 
    `}
              rows="2"
              cols="30"
              placeholder="enter your reply"
              name={reply}
              onChange={(e) => {
                setReply(e.target.value);
              }}
            ></textarea>

            <button
              onClick={sendReply}
              id={comment._id}
              className="border-2 border-black text-center w-[20%] bg-slate-400 text-white rounded-md"
            >
              send
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Commentcard;
