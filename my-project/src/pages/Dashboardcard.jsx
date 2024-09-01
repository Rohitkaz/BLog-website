import React from "react";
import { Link } from "react-router-dom";
const Dashboardcard = ({ blogdata }) => {
  const defaultimg = (e) => {
    e.target.src = "/images/noimage.png";
  };
  return (
    // <div className=" flex justify-center w-screen h-screen bg-gray-200">
    <div className="flex md:flex-row flex-col min-w-[100%]    max-h-[20%]  rounded-lg p-2 bg-white transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
      <div className="md:w-[50%]  w-full   ">
        <img
          className="w-full h-[250px]  object-cover  rounded-lg"
          src={`http://localhost:8000/images/${blogdata.image}`}
          onError={defaultimg}
        ></img>
      </div>
      <div className="gap-4 flex flex-col md:ml-4 md:w-[45%] lg:w-[40%] w-full">
      <div className="p-2">
        <h2 className="font-heading font-bold text-lg line-clamp-1">
          {blogdata.maintitle}
        </h2>
        <p className=" md:w-[265px] min-w-[95%]   font-heading text-md font-bold text-gray-600 line-clamp-3 ">
          {blogdata.description}
        </p>
      </div>
      <div className=" w-full flex flex-row   justify-between text-gray-600 ">
        <div className=" flex flex-row w-[50%]  gap-2">
          <img
            className="w- h-[38px] rounded-full aspect-auto object-cover"
            src="./images/user.png"
          ></img>
          <div className="font-heading font-bold text-sm ">
            <h2 className="line-clamp-1">{blogdata.author}</h2>
            <h2>{blogdata.createdAt}</h2>
          </div>
        </div>
    <div className="flex flex-row gap-2 p-1">
        <Link
          to={`/Blog/${blogdata._id}`}
          className=" md:text-center text-white  bg-purple-600 px-3 py-1.5 mr-1 rounded-lg font-heading hover:bg-purple-700 "
        >
          Read 
        </Link>
        <Link
          to={`/EditBlog/${blogdata._id}`}
          className="md:text-center  text-white bg-purple-600 px-3 py-1.5 mr-1 rounded-lg font-heading hover:bg-purple-700 "
        >
          Edit 
        </Link>
        
        
        </div>
      </div>
      </div>
    </div>
    
  );
};
export default Dashboardcard;
