import React, { createContext } from "react";
import Header from "./Header";
import { Link, redirect } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    console.log(name);
    const result = await axios.post(
      "http://localhost:8000/Auth/login",
      { name: name, password: password },
      {
        withCredentials: true,
      }
    );
    console.log(result.status);
    if (result.status == 404) navigate("/register");
    if (result.status == 200) {
      setIsLoggedin(true);
      navigate("/Dashboard");
    }
  };
  return (
    <>
      <Header />
      <div className=" border-blue-800  w-screen h-dvh border-t-8 flex justify-center   bg-slate-300 z-0  ">
        <div className=" border-2 border-white rounded shadow-md shadow-slate-100 w-3/4 mt-10  md:mb-20 md:mt-10 md:h-3/4 h-[400px] md:w-[450px] flex-col flex  bg-slate-50 z-5 ">
          <div className="w-full border-b-2 border-gray-500 mt-[10px] font-sans text-lg text-center  p-4 font-bold ">
            WELCOME BACK!
          </div>
          <div className="flex flex-col mt-[50px] gap-5 justify-center items-center   ">
            <input
              name={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              placeholder="Name"
              className="  border-green border-2  w-3/4 md:h-[40px] pl-2"
            ></input>
            <input
              name={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="text"
              placeholder="Password"
              className="  border-green border-2  w-3/4 md:h-[40px] pl-2 "
            ></input>
            <button
              onClick={login}
              className=" border-none bg-blue-800 mt-5 h-[50px] text-center pt-2 w-3/4 text-white hover:bg-teal-500 hover:text-blue-900 "
            >
              LOGIN
            </button>
          </div>

          <div className=" border-gray-500 border-t-2 mt-10 flex flex-row justify-between md:p-5 p-1">
            <div className="text-blue-600 font-heading hover:text-green-500">
              <Link to="/Register">Don't have an account? </Link>
            </div>
            <div>forgot Password?</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
