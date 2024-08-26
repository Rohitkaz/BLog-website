import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

import { useEffect, useState } from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import axios from "axios";

import Header from "./Header";
import Dashboardheader from "./Dashboardheader";
import Dashboardcard from "./Dashboardcard";
const Allblog = () => {
  const [post,setPost]=useState([])
   const [currentpage,setCurrentPage]=useState(0);
  const [removeloadmore,setRemoveloadmore]=useState(false);
   const handleClick=()=>{
    setCurrentPage((prev)=>prev+1);
   }
   useEffect(()=>{
  
        const fetchdata=async()=>{
        
          try {
            const res = await axios.get(`http://localhost:8000/Yourblog/${currentpage}`, {
              withCredentials: true,
            });
            const data = res.data;
            if(data.length==0 || data.length<4)
            {
              setRemoveloadmore(true);
            }
               setPost([...post,...data]);
               
            
          } catch (err) {
          console.log(err.message);
          }
        }
        
        fetchdata();
   },[currentpage]);
  return (
    <>
      <div className=" flex flex-col w-[full] min-h-screen bg-gray-200 overflow-x-hidden ">
        <Header />
        <Dashboardheader />
        {post.length > 0 ? (
          <div className="w-screen flex  flex-col  items-center gap-2">
          
          <div className="flex flex-col mt-1 justify-center items-center    gap-8   md:ml-4 w-[80%]   md:w-[75%]      ">
            {post.map((blog, index) => (
              <Dashboardcard blogdata={blog} />
            ))}
            
          </div>
          {removeloadmore?null:
          <div className="flex w-[90%] justify-end">
          <button onClick={handleClick} className="p-2 font-heading bg-purple-600 rounded-lg shadow-gray-400 shadow-lg text-white border-2 border-black transiton-all ease-in-out duration-300  hover:translate-x-2">Load More...</button>
          </div>}
          </div>
        ) : (
          <div className="flex flex-col w-screen h-[100%]  items-center gap-2 justify-center">
            <h1 className="font-heading text-4xl">NO BLOGS</h1>
            <Link
              to="/newblog"
              className=" bg-purple-600 font-heading text-xl p-2 font-bold rounded-lg transition-all ease-out hover:-translate-y-1 duration-300 shadow-lg"
            >
              CREATE BLOG
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
export default Allblog;
