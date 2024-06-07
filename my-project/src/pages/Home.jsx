import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import BlogCard from "./BlogCard";
const Home = () => {
  const [name, setName] = useState("");
  const [post, setPost] = useState([]);
  const [img, setImg] = useState();
  // const [showmenu, setShowmenu] = useState("hidden");
  const showBlog = async () => {
    const result = await axios.get("http://localhost:8000/image");

    setPost(result.data);

    console.log(post);
  };
  const [hideham, setHideham] = useState("flex");
  const [margin, setMargin] = useState("hidden opacity-0");
  const hamburgermenu = () => {
    setMargin(
      " flex opacity-100  mt-0  transition-all ease duration-700 h-dvh  "
    );
    setHideham("hidden");
  };
  return (
    <div className="flex flex-col w-screen h-dvh    ">
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
          className={` md:flex md:flex-row  w-60 md:mr-40 md:bg-white md:h-[80px] flex-col list-none ${margin}  md:opacity-100 gap-10 items-center font-bold   bg-pink-500 `}
        >
          <li>Home</li>
          <li>
            <Link to="/Register">Register</Link>
          </li>
          <Link to="/image">Blog</Link>
          <li>Contact</li>
        </nav>
        <RxHamburgerMenu
          className={`${hideham} md:hidden mt-2 mr-[30px]  h-[50px] w-[40px] `}
          onClick={hamburgermenu}
        />
      </div>
      <button onClick={showBlog}>show blog</button>
      <div className="flex flex-col place-items-center md:place-items-start md:flex-wrap   md:flex-row sm:flex-row sm:flex-wrap w-[100%]  h-[77%] gap-8 p-5 ">
        {post.map((blog, index) => (
          <BlogCard blogdata={blog} />
        ))}
      </div>
    </div>
  );
};
export default Home;
