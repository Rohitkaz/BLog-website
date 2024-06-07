import React from "react";
import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import "../index.css";
import { RiImageAddLine } from "react-icons/ri";

const BlogForm = () => {
  const [contentBox, setContentBox] = useState([{ title: "", text: "" }]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [author, setAuthor] = useState("ROHIT");
  const [description, setDescription] = useState("");
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
    // formdata does not directly stringify and sends only strings so stringify yourself
    formData.append("author", author);
    formData.append("description", description);
    formData.append("maintitle", title);
    formData.append("blogcnt", JSON.stringify(contentBox));
    formData.append("image", image);

    /* console.log(image);
        console.log(title);
        console.log(blogcnt);*/
    console.log(contentBox);
    const result = await axios.post("http://localhost:8000/image", formData, {
      headers: { "content-Type": "multipart/form-data" },
    });
  };

  const setImg = (e) => {
    setImage(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="flex flex-col gap-[20px] max-w-[1024px] m-[2%] lg:ml-[10%]">
      <div className=" flex flex-col justify-center items-center border-black border-2 sm:h-[300px] sm:m[40px] sm:w-[100%]   h-[300px] w-[100%]  ">
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
          ></input>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the blog title here...."
            className={`w-[80%] border-2   sm:w-[95%] md:h-[40px] md:w-[95%]`}
          ></input>

          <button
            type="submit"
            className={` h-[40px]  border-green-400 border-2 bg-blue-600 text-blue-50 rounded-md  `}
          >
            PUBLISH
          </button>
        </div>
        <textarea
          name="blogpara"
          cols="30"
          rows="7"
          className="border-2 border-black w-[100%]"
          placeholder="Write description here..."
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <div className="flex flex-col gap-1 w-[100%]">
          {contentBox.map((content, index) => (
            <>
              <div className="flex flex-row gap-1 w-[100%]">
                <button
                  onClick={() => addContent()}
                  className=" w-[10%]  sm:w-[5%] lg:w-[4%] h-[40px] place-content-center border-green-400 border-2 rounded-full "
                >
                  <GrAdd className=" w-[100%] h-[80%]  " />
                </button>
                <input
                  type="text"
                  name="title"
                  placeholder="Title..."
                  className={`  w-[85%] border-2  sm:w-[90%] md:h-[40px] md:w-[95%]`}
                  onChange={(e) => changeContentTitle(e, index)}
                  value={content.title}
                ></input>

                <button
                  onClick={() => deleteContent(index)}
                  className={` h-[40px]  border-green-400 border-2 bg-blue-600 text-blue-50 rounded-md `}
                >
                  delete
                </button>
              </div>
              <textarea
                name="blogpara"
                cols="30"
                rows="10"
                className="border-2 border-black w-[100%]"
                placeholder="Your story here..."
                onChange={(e) => changeContentPara(e, index)}
                value={content.blogpara}
              ></textarea>
            </>
          ))}
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
