import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavAfterLogin(props) {
  return (
    <nav>
      <ul className="nav-list flex items-center">
        <li>
          <NavLink
            activeClassName="bg-blue-500 text-blue-200 px-4 py-1 font-bold  text-lg rounded-md  hover:text-blue-300 "
            to="/questions"
          >
            Questions
          </NavLink>
        </li>
        <li className="nav-item ml-4">
          <button
            onClick={() => {
              props.handleIsLoggedIn(false);
              localStorage.removeItem("username");
              localStorage.removeItem("authToken");
              props.updateUsername("");
              props.history.push("/");
            }}
            className="nav-link btn bg-blue-500 text-gray-100 border"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

function NavBeforeLogin(props) {
  return (
    <nav>
      <ul className="nav-list flex">
        <li className="nav-item">
          <Link
            to="/login"
            className="nav-link btn bg-blue-500 text-gray-100 border"
          >
            Login
          </Link>
        </li>
        <li className="nav-item ml-4">
          <Link to="/register" className="nav-link btn border border-gray-500">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
}

class Header extends React.Component {
  render() {
    return (
      <header className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 shadow-md fixed top-0 left-0 right-0 z-20">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="logo">
            <h1 className="text-xl font-bold ">Sangha Samadhan</h1>
          </Link>
          <input
            type="text"
            className="w-64 md:w-2/5 p-1 px-4 border border-gray-600 rounded-sm text-md  outline-none  "
            placeholder="Search for question..."
          />
          {this.props.isLoggedIn ? (
            <NavAfterLogin
              history={this.props.history}
              handleIsLoggedIn={this.props.handleIsLoggedIn}
              updateUsername={this.props.updateUsername}
            />
          ) : (
            <NavBeforeLogin />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
