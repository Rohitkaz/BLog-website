import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdClose } from "react-icons/md";
import { useState, useContext, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuthcontext } from "./context";
import { Navigate } from "react-router-dom";
const Header = () => {
  const [ishidden, setIsHidden] = useState(false);
  const [inputwidth, setInputwidth] = useState("");
  const [isTrue, setIsTrue] = useState(false);
  const context = useAuthcontext();
  const [searchresult, setSearchresult] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const searchWrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target)
      ) {
        setSearchresult([]);
        setInput("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchWrapperRef]);
  useEffect(()=>{
    const controller=new AbortController();
    const signal=controller.signal;
    const Fetchresult=async()=>{
      try {
        const result = await axios.get(
          `http://localhost:8000/search?query=${input}`
        ,{signal:signal});
        setSearchresult(result.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    Fetchresult();
    return ()=>{
      controller.abort();
    }
  },[input])
  const logout = async () => {
    const result = await axios.get(
      "http://localhost:8000/Auth/logout",

      {
        withCredentials: true,
      }
    );
    if (result.status === 204) {
      localStorage.clear();
      navigate("/login");
    }
  };
  const openham = () => {
    setIsTrue(true);
    setInputwidth("hidden");
    setIsHidden(true);
  };
  const closeham = () => {
    setIsTrue(false);
    setInputwidth("");
    setIsHidden(false);
  };

  
  return (
    <div className=" flex flex-row w-screen bg-black h-[40px] mt-[0px]  fixed z-10">
      <div
        className={`flex flex-row ${inputwidth}  w-[60%] h-[100%] md:gap-2  gap-5 ml-[3%] md:ml-0  `}
      >
        <div className=" ml-[2%] md:ml-[20%] flex font-heading  font-bold  text-xl md:text-2xl text-white items-center   ">
          Blogit
        </div>
        <div
          className="flex flex-col  ml-[10%] w-[50%] "
          ref={searchWrapperRef}
        >
          <div className="flex flex-row  w-[100%] rounded-lg shadow-lg gap-2  md:border-2 justify-center md:h-[80%]  mt-1">
            <CiSearch className=" text-white font-heading  h-[100%] w-[7%] text-center mt-0.5" />
            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              type="text"
              placeholder="Search..."
              className=" text-white font-heading  bg-black outline-none md:w-[95%] mt-1 md:mt-0 "
            ></input>
          </div>
          {input.length > 0 ? (
            <div className=" -ml-7 md:ml-0  absolute overflow-y-scroll scrollbar-thin bg-gray-800 rounded-lg   flex flex-col w-[60%] md:w-[25%] mt-[40px] gap-2 h-[300%]  border-2">
              {searchresult.length > 0 ? (
                <>
                  {" "}
                  {searchresult.map((result, index) => (
                    <div className=" ml-[2%] flex w-[96%]  rounded-lg mt-1 gap-1   ">
                      <div className="flex w-[75%]  mt-0.5 text-white font-heading ml-2   ">
                        {result.maintitle}
                      </div>
                      <div className="flex items-center h-[30px] p-1 hover:text-green-500 text-white font-heading  border-2 bg-gray-600 rounded-lg shadow-lg mt-0.5 justify-center ">
                        <Link to={`/Blog/${result._id}`}> Read </Link>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex text-white h-full w-full justify-center items-center">
                  no result
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex w-[100%]  md:w-[60%] h-[100%]  justify-end z-10 md:flex-row  ">
        <div
          className={`  flex-col h-dvh md:opacity-[100%]   mr-0 font-heading text-xl    md:w-[100%] font-bold  md:bg-black md:flex  md:flex-row  md:h-[100%] text-white list-none gap-[5%] flex items-center  md:justify-end md:pr-[10%] bg-pink-600  ${
            isTrue
              ? "w-[90%] transition-all delay-75 duration-500 ease-in-out opacity-100 "
              : "w-[0%] "
          }`}
        >
          <MdClose className=" md:hidden h-[10%] w-[20%]" onClick={closeham} />
          <li
            className={`hover:text-cyan-600 md:block ${
              isTrue ? null : "hidden"
            }`}
          >
            <Link to="/">Home</Link>
          </li>
          {context.user ? (
            <li
              className={`hover:text-cyan-600 md:block ${
                isTrue ? null : "hidden"
              }`}
            >
              <Link to="/dashboard">Dashboard</Link>
            </li>
          ) : (
            <li
              className={`hover:text-cyan-600 md:block ${
                isTrue ? null : "hidden"
              }`}
            >
              <Link to="/Login">Login</Link>
            </li>
          )}
          {context.user ? (
            <li
              className={`hover:text-cyan-600 md:block ${
                isTrue ? null : "hidden"
              }`}
            >
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li
              className={`hover:text-cyan-600 md:block ${
                isTrue ? null : "hidden"
              }`}
            >
              <Link to="/Register">Register</Link>
            </li>
          )}
        </div>
        <RxHamburgerMenu
          className={`md:hidden text-white h-[100%]  w-[20%] mr-5 ${
            ishidden ? "hidden" : null
          }
        
          `}
          onClick={openham}
        />
      </div>
    </div>
  );
};
export default Header;
