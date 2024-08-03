import React from "react";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import "../index.css";
import { RiImageAddLine } from "react-icons/ri";
import Header from "./Header";
import Dashboardheader from "./Dashboardheader";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const BlogForm = () => {
  const navigate = useNavigate();
  const [contentBox, setContentBox] = useState([{ title: "", text: "" }]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [author, setAuthor] = useState("ROHIT");
  const [description, setDescription] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const changeContentTitle = (e, index) => {
    const temp = [...contentBox];
    temp[index].title = e.target.value;
    setContentBox(temp);
  };
  const changeContentPara = (e, index) => {
    const temp = [...contentBox];
    temp[index].text = e.target.value;
    setContentBox(temp);
  };
  const addContent = () => {
    setContentBox((prev) => [...prev, { title: "", text: "" }]);
  };
  const deleteContent = (index) => {
    setContentBox((prev) => prev.filter((_, ind) => ind !== index));
  };
  const uploadblog = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title === "") {
      return alert("title cannot be empty!");
    }
    // formdata does not directly stringify and sends only strings so stringify yourself
    formData.append("author", author);
    formData.append("description", description);
    formData.append("maintitle", title);
    formData.append("blogcnt", JSON.stringify(contentBox));
    formData.append("image", image);

    /* console.log(image);
        console.log(title);
        console.log(blogcnt);*/

    try {
      setisSubmitting(true);
      console.log(contentBox);
      const result = await axios.post(
        "http://localhost:8000/newblog",
        formData,
        {
          withCredentials: true,
        },
        {
          headers: { "content-Type": "multipart/form-data" },
        }
      );

      navigate(`/Blog/${result.data}`);
    } catch (err) {
      alert(err.response.data);
      setisSubmitting(false);
    }
  };

  const setImg = (e) => {
    setImage(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <>
      <div className=" flex flex-col w-[screen]  bg-gray-200 ">
        <Header />
        <Dashboardheader />
        <div className="flex flex-col gap-[20px] max-w-[1024px] m-[2%] lg:ml-[10%] p-2">
          <div className=" flex flex-col justify-center items-center rounded-lg  sm:h-[300px] sm:m[40px] sm:w-[100%]   h-[200px] w-[100%]  ">
            <h1 className="font-heading font-bold"> upload image here...</h1>
            <img
              src={file}
              className="w-[80%] h-[85%] object-contain mt-[1%] border-none"
            />
            <label
              htmlFor="fileinput"
              className="  w-[100%]  sm:w-[100%] lg:w-[100%] h-[10%] place-content-center "
            >
              <RiImageAddLine className="w-[100%] h-[100%]" />
            </label>
          </div>
          <form
            onSubmit={uploadblog}
            className=" flex flex-col w-[100%] gap-[10px]"
          >
            <div className="flex flex-row  w-[100%] gap-[10px]">
              <input
                onChange={setImg}
                id="fileinput"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg,image/jpg,img/gif"
              ></input>

              <div className="w-[100%] flex flex-col md:gap-2 gap-1 ">
                <h1 className="font-heading font-bold  ">Title</h1>
                <div className="w-[100%] flex flex-row gap-2">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the blog title here...."
                    className={`w-[80%] border-2  rounded-lg  sm:w-[95%] md:h-[40px] md:w-[95%]`}
                  ></input>

                  {!isSubmitting ? (
                    <button
                      type="submit"
                      className={` h-[40px] hover:text-red-700 z-5 shadow-lg font-heading font-bold  border-2 bg-slate-400  rounded-lg  `}
                    >
                      Publish
                    </button>
                  ) : (
                    <label
                      className={` h-[40px] hover:text-red-700 z-5 shadow-lg font-heading font-bold  border-2 bg-slate-400  rounded-lg  `}
                    >
                      Uploading
                    </label>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[100%] flex flex-col md:gap-2 gap-1 ">
              <h1 className="font-heading font-bold  ">Description</h1>
              <textarea
                cols="30"
                rows="2"
                name="blogpara"
                className={`w-[100%] border-2  rounded-lg   md:h-[40px] `}
                placeholder="Write description here..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>
            <h1 className="font-heading font-bold">
              Enter content of blog in paragraphs
            </h1>
            <div className="flex flex-col gap-1 w-[100%] ">
              {contentBox.map((content, index) => (
                <>
                  <div className="flex flex-row gap-1 w-[100%]">
                    <label
                      onClick={addContent}
                      className=" w-[35px]  sm:w-[5%] lg:w-[4%] md:h-[40px] h-[35px] mt-1 place-content-center border-green-400 border-2 rounded-full "
                    >
                      <GrAdd className=" w-[100%] h-[80%]  " />
                    </label>
                    <input
                      type="text"
                      name="title"
                      placeholder="para heading..."
                      className={`  w-[85%] border-2 rounded-lg  sm:w-[90%] md:h-[40px] md:w-[95%]`}
                      onChange={(e) => changeContentTitle(e, index)}
                      value={content.title}
                    ></input>

                    <label
                      onClick={() => deleteContent(index)}
                      className={` h-[40px] z-5 hover:text-red-700 shadow-lg pt-1 font-heading font-bold border-2 bg-slate-400 items-center rounded-lg `}
                    >
                      delete
                    </label>
                  </div>
                  <textarea
                    name="blogpara"
                    cols="30"
                    rows="10"
                    className="border-2 rounded-lg  w-[100%]"
                    placeholder="Your story here..."
                    onChange={(e) => changeContentPara(e, index)}
                    value={content.blogpara}
                  ></textarea>
                </>
              ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BlogForm;
