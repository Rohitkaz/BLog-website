import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Scrollbar } from "react-scrollbars-custom";
import axios from "axios";
import Header from "./Header";
import { IoIosArrowUp } from "react-icons/io";
import { FaAngleDown, FaHireAHelper } from "react-icons/fa6";
import Commentcard from "./commentcard";
import { useAuthcontext } from "./context";
const CommentBar = ({ blogid, blogauthor, change, deccomment }) => {
  const [comment, setComment] = useState();
  const context = useAuthcontext();
  const [issendingcomm, setIssendingcomm] = useState(false);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showreplies, setShowreplies] = useState(false);
  const [showreplyindex, setShowreplyindex] = useState();
  const [highlightedComment, setHighlightedComment] = useState(null);
  const commentRefs = useRef({});
  const handleHighlight = (commentId) => {
    console.log(commentId);
    setHighlightedComment(commentId);
    if (commentRefs.current[commentId]) {
      commentRefs.current[commentId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setTimeout(() => {
      setHighlightedComment("");
    }, 10000);
  };
  useEffect(() => {
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
    showcomments();
  }, []);
  const changereplies = (replies, parentId, index) => {
    console.log(comment);
    setReplies(replies);
    if (parentId == null) {
      setShowreplies(true);
      setShowreplyindex(index);
    }
  };
  const changecomments = (comment) => {
    if (comment.parentId === null) {
      const comms = comments.filter((item) => item != comment);
      deccomment();
      setShowreplies(false);
      setComments(comms);
    } else {
      const rep = replies.filter((item) => item != comment);
      setReplies(rep);
    }
  };

  const sendComment = async () => {
    if (!context.user) {
      return alert("First Login to send comments");
    }
    if (!comment) {
      return alert("Comment cannot be empty");
    }
    setIssendingcomm(true);
    console.log(blogauthor);
    const comm = {
      blog_id: blogid,
      comment: comment,
      blogauthor: blogauthor,
    };

    console.log(blogid);
    try {
      const res = await axios.post(`http://localhost:8000/comment`, comm, {
        withCredentials: true,
      });
      change();
      setIssendingcomm(false);

      if (comments.length > 0) {
        setComments((prev) => [res.data, ...prev]);
      } else {
        showcomments();
      }
    } catch (err) {
      setIssendingcomm(false);
      console.log(err.response.data);
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
    <div className="flex flex-col w-[100%] border-2 items-center gap-1 border-none h-dvh p-3">
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
      {issendingcomm ? (
        <label className="font-heading w-[87%] text-center rounded-lg text-white bg-blue-700  h-[30px]">
          Sending...
        </label>
      ) : (
        <button
          onClick={sendComment}
          className="font-heading w-[87%] rounded-lg text-white bg-blue-700 hover:text-black h-[30px]"
        >
          Send
        </button>
      )}
      <button
        onClick={showcomments}
        className="font-heading w-[87%] rounded-lg text-white bg-blue-700 hover:text-black h-[30px]"
      >
        Showcomments
      </button>
      <div className=" p-2 flex flex-col w-[100%] h-[80%]  items-center gap-1 mt-2 overflow-y-auto scrollbar-track-black">
        {comments.map((comment, index) => (
          <>
            <div
              ref={(el) => (commentRefs.current[comment._id] = el)}
              className={`flex flex-col w-[87%]  items-center bg-white ${
                highlightedComment === comment._id ? "shadow-lg shadow-blue-700" : null
              } mt-2 shadow-lg rounded-lg p-2`}
            >
              <Commentcard
                comment={comment}
                index={index}
                change={changereplies}
                changecomments={changecomments}
                handleHighlight={handleHighlight}
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
                className="font-heading w-[87%] mt-1 rounded-lg  text-black bg-slate-400 h-[30px]"
              >
                Replies
              </button>
            </div>
            {showreplies && showreplyindex === index ? (
              <>
                {replies.map((comment, index) => (
                  <div
                    ref={(el) => (commentRefs.current[comment._id] = el)}
                    className={`w-[77%] border-2 shadow-sm shadow-blue-400 mt-2 ${
                      highlightedComment === comment._id
                        ? "shadow-lg border-red-500 border-2 shadow-blue-600"
                        : null
                    } md:ml-10 ml-[10%] bg-white rounded-lg p-2`}
                  >
                    <Commentcard
                      comment={comment}
                      index={index}
                      change={changereplies}
                      changecomments={changecomments}
                      handleHighlight={handleHighlight}
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
