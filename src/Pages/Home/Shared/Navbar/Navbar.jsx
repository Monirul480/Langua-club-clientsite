import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Navbar/Navbar.css";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";

// tigike
import React, { useState } from "react";
import DarkModeToggle from "react-dark-mode-toggle";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = "/";

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Toast.fire({
          icon: 'success',
          title: "logout successfully"
        })
        navigate(from);
      })
      .catch((error) => console.log(error));
  };

  const goProfile = () => {
    navigate("dashboard/profile");
  };

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-green-400 font-bold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allInstructors"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-green-400 font-bold"
          }
        >
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allClasses"
          className={({ isActive }) =>
            isActive ? "text-white" : "text-green-400 font-bold"
          }
        >
          Classes
        </NavLink>
      </li>
      {user && (
        <>
          {" "}
          <li>
            <NavLink
              to="dashboard/profile"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-green-500 font-bold"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
      <li>
        <DarkModeToggle
          onChange={setIsDarkMode}
          checked={isDarkMode}
          size={80}
        />
      </li>
    </>
  );
  return (
    <div className="navbar lg:fixed z-10 text-white bg-black bg bg-opacity-30  mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <div className="flex">
          <img className="h-16  w-20" src="bavlogo.png" alt="" />
          <p className="pt-5 invisible lg:visible font-bold text-2xl pl-0">
            Language<span className="text-blue-500">Center</span>
          </p>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <button
              onClick={handleLogOut}
              className="bg-green-500 btn hover:bg-green-900 text-white mr-3 normal-case"
            >
              Log Out
            </button>
            <div className="group relative lg:mr-6  flex justify-center">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div
                  onClick={goProfile}
                  className="w-15 rounded-full group relative flex justify-center"
                >
                  <img
                    src={
                      user
                        ? user?.photoURL
                        : "../../../../../public/profile.png"
                    }
                  ></img>
                </div>
              </label>
            </div>
          </>
        ) : (
          <button className="btn bg-blue-500 text-white hover:bg-blue-900 border-0 normal-case">
            <NavLink className="hover:text-white" to="/login">
              Login
            </NavLink>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

// navbar fixed z-10 text-white bg-black bg bg-opacity-30 max-w-screen-xl mx-auto
