import React from "react";
import { FiMail } from "react-icons/fi";
import { BiLockOpenAlt } from "react-icons/bi";

function LoginPage() {
  return (
    <div className="login-page min-h-screen bg-blue-100 relative">
      <div className="container grid grid-cols-3 py-24">
        <div className="col-span-2 text-gray-700">
          <h2 className="text-4xl text-center font-bold  mb-8">
            Sangha Samadhan
          </h2>
          <p className="px-20 text-lg">
            It is a one stop solution to all your problems, if you are a good
            developer it will hone your skills and if you are still a junior
            developer it will expand your arena of knowledge towards
            programming.
          </p>
        </div>
        <div className="login-div bg-gray-100 p-10 py-12 rounded-lg z-10  shadow-lg">
          <h3 className="text-center font-bold text-lg mb-2">Member Login</h3>
          <form action="/">
            <div className="flex items-center my-3 mb-8">
              <div className="mr-4 w-1/12 ">
                <FiMail size={32} />
              </div>
              <input
                className=" w-full py-3 px-4 rounded-tr-md  outline-none border-b-2 border-gray-400 focus-within:border-blue-500 transition duration-200 ease-in-out"
                type="text"
                placeholder="Email"
              />
            </div>
            <div className="flex items-center my-3 ">
              <div className="mr-4 w-1/12">
                <BiLockOpenAlt size={32} />
              </div>
              <input
                className=" w-full py-3 px-4 rounded-tr-md outline-none border-b-2 border-gray-400 focus-within:border-blue-500 transition duration-200 ease-in-out"
                type="text"
                placeholder="Password"
              />
            </div>
            <button className="bg-gradient-to-tr from-blue-400 via-blue-600 to-blue-800 w-full py-3 mt-8 mb-10 rounded-md text-blue-100 font-bold  text-lg hover:text-blue-300 transition ease-in-out 250ms">
              Login
            </button>
            <p className="text-center text-xs">
              Not a member?{" "}
              <a className="text-blue-600 font-bold" href="/">
                Create Account
              </a>
            </p>
          </form>
        </div>
      </div>

      <div className="top-circle-o absolute right-0 top-0 bg-blue-600 z-0">
        <div className="top-circle-i absolute bg-gray-100 right-0"></div>
      </div>

      <div className="bottom-circle absolute left-0 bottom-0 w-64 h-64 bg-blue-400 rounded-t-full rounded-r-full rounded-b-none rounded-l-none ">
        <div className="absolute bg-green-100 left-0 bottom-0 w-56 h-56 rounded-t-full rounded-r-full rounded-b-none rounded-l-none"></div>
      </div>
    </div>
  );
}

export default LoginPage;
