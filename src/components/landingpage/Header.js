import React from "react";

function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md fixed top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <a className="logo" href="/">
          <h1 className="text-xl font-bold ">Sangha Samadhan</h1>
        </a>
        <input
          type="text"
          className="w-64 md:w-2/5 p-1 px-4 border border-gray-600 rounded-sm text-md  outline-none  "
          placeholder="Search for question..."
        />
        <nav>
          <ul className="nav-list flex">
            <li className="nav-item">
              <a
                className="nav-link btn bg-blue-500 text-gray-100 border"
                href="/"
              >
                Login
              </a>
            </li>
            <li className="nav-item ml-4">
              <a className="nav-link btn border border-gray-500" href="/">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
