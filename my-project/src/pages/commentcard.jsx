import React from "react";
import { useState } from "react";

import axios from "axios";
import Header from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuthcontext } from "./context";
const Commentcard = ({
  comment,
  index,
  change,

  changecomments,
  handleHighlight,
}) => {
  const [clikes, setClikes] = useState(comment.likes);
  const [isTrue, setIsTrue] = useState(false);
  const [reply, setReply] = useState();
  const [replyindex, setReplyindex] = useState();
  const [showreplies, setShowreplies] = useState(false);
  const [showreplyindex, setShowreplyindex] = useState();
  const [replies, setReplies] = useState([]);
  const [showButtons, setShowbuttons] = useState(false);
  const [isdeleting, setisdeleting] = useState(false);
  const [issending, setIssending] = useState(false);
  const [highlightedComment, setHighlightedComment] = useState(null);
  const context = useAuthcontext();

  const showButton = () => {
    if (showButtons === true) setShowbuttons(false);
    else setShowbuttons(true);
  };
  const deletecomment = async () => {
    if (!context.user) {
      return alert("First Login to delete comments!");
    }
    if (context.user.id !== comment.userId) {
      return alert("you can delete only your comments!");
    }
    setisdeleting(true);
    try {
      const res = await axios.delete(
        `http://localhost:8000/deletecomment/${comment._id}/${comment.postId}/${comment.parentId}`,

        {
          withCredentials: true,
        }
      );

      changecomments(comment);
      setisdeleting(false);
    } catch (err) {
      setisdeleting(false);
      alert(err.message);
    }
  };
  const sendReply = async (e) => {
    if (!context.user) {
      return alert("First Login to send reply");
    }
    if (!reply) {
      return alert("reply cannot be empty");
    }
    setIssending(true);
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
      setIssending(false);
    } catch (err) {
      setIssending(false);
      alert(err.response.message);
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
    <div className="flex flex-col items-center w-[100%] h-[90%] gap-1 rounded-lg   ">
      <div className="flex flex-row w-[100%] gap-2">
        <img className="w-[30px] h-[30px]" src="/images/user.png"></img>
        <div className="flex flex-row w-[90%] h-[10%]  font-heading text-sm font-bold gap-2 mt-1">
          <div>{comment.username}</div>
          {comment.Repliedto ? (
            <div
              className="text-blue-700 cursor-pointer"
              onClick={() => handleHighlight(comment.Repliedtoid)}
            >
              @{comment.Repliedto}
            </div>
          ) : null}
        </div>
        <div className=" flex flex-col w-[80%] items-center gap-1  ">
          <BsThreeDotsVertical
            className=" mt-1 ml-[50%]"
            onClick={showButton}
          />
          {showButtons ? (
            <div className="  w-[100%] flex justify-center ">
              {isdeleting ? (
                <div className="text-red-700 font-heading font-bold">
                  deleting...
                </div>
              ) : (
                <button
                  onClick={deletecomment}
                  className=" ml-[40%] md:pl-1 md:pr-1 bg-slate-300 hover:translate-x-1 transition-all ease-in-out font-heading font-bold  hover:text-red border-2 border-gray-300 rounded-lg"
                >
                  Delete
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="  font-heading w-[87%] text-blue-800 border-2 border-gray-500 rounded-md mt-2">
        {comment.content}
      </div>
      <div className="flex flex-row w-[87%] font-heading justify-between ">
        <button
          onClick={likecomment}
          className="p-1 text-black bg-slate-400    rounded-md hover:translate-x-1 duration-150"
        >
          Like({clikes})
        </button>
        <div className=" p-1 flex  flex-row bg-slate-400 justify-center items-center rounded-md hover:translate-x-1 duration-150  ">
          <label className="text-black    ">
            Reply
          </label>
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

            {issending ? (
              <label className="border-2 border-black text-center p-1 bg-purple-600 text-white rounded-md">
                sending..
              </label>
            ) : (
              <button
                onClick={sendReply}
                id={comment._id}
                className="border-2 hover:translate-x-1 mt-1 transition-all ease-in-out  border-black text-center w-[20%] bg-purple-600 text-white rounded-md"
              >
                send
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default Commentcard;
