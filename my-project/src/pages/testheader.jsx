import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
const Header = () => {
  const [hideham, setHideham] = useState("flex");
  const [margin, setMargin] = useState("hidden opacity-0");

  const hamburgermenu = () => {
    setMargin(
      " flex opacity-100  mt-0  transition-all ease duration-700 h-dvh  "
    );
    setHideham("hidden");
  };
  return (
    <>
      <div className="flex flex-col w-screen h-[15%]    ">
        <div className="    sm:max-w-screen flex h-[45px]  bg-black  ">
          <div className="flex  md:ml-40 ml-5">
            <CiSearch className="text-white h-full w-[18px] mr-2 text-center  " />
            <input
              type="text"
              name={name}
              placeholder="Search..."
              className=" text-white bg-black outline-none "
            ></input>
          </div>
        </div>
        <div className="flex   flex-row md:justify-end  w-screen h-[80px]  gap-0 justify-end z-10">
          <nav
            className={` font-heading  md:flex md:flex-row  w-60 md:mr-40 md:bg-white md:h-[80px] flex-col list-none ${margin}  md:opacity-100 gap-10 items-center font-extrabold   bg-pink-400 `}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <Link to="/image">Blog</Link>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </nav>
          <RxHamburgerMenu
            className={`${hideham} md:hidden mt-2 mr-[30px]  h-[50px] w-[40px] `}
            onClick={hamburgermenu}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
