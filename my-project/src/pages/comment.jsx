import React from "react";
import { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import axios from "axios";
import Header from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import Commentcard from "./commentcard";
const CommentBar = ({ blogid, blogauthor, change }) => {
  const [comment, setComment] = useState();

  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showreplies, setShowreplies] = useState(false);
  const [showreplyindex, setShowreplyindex] = useState();
  const changereplies = (comment) => {
    console.log(comment);
    setReplies((prev) => [...prev, comment]);
  };
  const sendComment = async () => {
    console.log(blogauthor);
    const comm = {
      blog_id: blogid,
      comment: comment,
      blogauthor: blogauthor,
    };
    change();

    console.log(blogid);
    try {
      const res = await axios.post(`http://localhost:8000/comment`, comm, {
        withCredentials: true,
      });
      setComments((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err.message);
    }
  };
  const showcomments = async () => {
    const comms = await axios.get(
      `http://localhost:8000/showcomments/${blogid}`,
      {
        withCredentials: true,
      }
    );

    const comm = comms.data;
    console.log(comm);
    setComments(comm);
  };
  return (
    <div className="flex flex-col w-[100%] border-2 items-center gap-1 border-none h-dvh overflow-y-scroll scrollbar-thin">
      <div className="w-[100%] h-[5%]"></div>
      <textarea
        Name={comment}
        placeholder="What's Your Thought?"
        cols="30"
        rows="2"
        className="font-heading w-[87%] border-2 border-black rounded-lg pl-2 pt-1"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></textarea>
      <button
        onClick={sendComment}
        className="font-heading w-[87%] rounded-lg text-white bg-blue-700 h-[30px]"
      >
        Send
      </button>
      <button
        onClick={showcomments}
        className="font-heading w-[87%] rounded-lg text-white bg-blue-700 h-[30px]"
      >
        Showcomments
      </button>
      <div className="flex flex-col w-[100%] h-[80%]  items-center gap-1 mt-2  ">
        {comments.map((comment, index) => (
          <>
            <div className="flex flex-col w-[87%]  items-center  mt-2 border-2 border-red">
              <Commentcard
                comment={comment}
                index={index}
                change={changereplies}
              />
              <button
                id={comment._id}
                onClick={async (e) => {
                  if (showreplies == true) {
                    setShowreplies(false);
                    setShowreplyindex(-1);
                  } else {
                    const res = await axios.get(
                      `http://localhost:8000/showreplies/${blogid}/${e.target.id}`,

                      {
                        withCredentials: true,
                      }
                    );
                    setReplies(res.data);
                    setShowreplies(true);
                    setShowreplyindex(index);
                  }
                }}
                className="font-heading w-[87%] mt-0 rounded-lg text-white bg-blue-700 h-[30px]"
              >
                Replies
              </button>
            </div>
            {showreplies && showreplyindex === index ? (
              <>
                {replies.map((comment, index) => (
                  <div className="w-[77%] border-2 border-emerald-600 ml-10">
                    <Commentcard
                      comment={comment}
                      index={index}
                      change={changereplies}
                    />
                  </div>
                ))}
              </>
            ) : null}
          </>
        ))}
      </div>
    </div>
  );
};
export default CommentBar;
