import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { CgProfile } from "react-icons/cg";
import { AiFillFolderAdd } from "react-icons/ai";
import {
  MdClass,
  MdSupervisedUserCircle,
  MdMovie,
  MdBookmarkAdd,
  MdPayment,
} from "react-icons/md";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  console.log(isAdmin);
 

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex bg-slate-200 flex-col">
        {/* Page content here */}
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button  lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-green-300 text-2xl ">
          {isAdmin === "admin" ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                >
                  <CgProfile className="text-2xl" />
                  Admin Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="/dashboard/allUsers"
                >
                  <MdSupervisedUserCircle className="text-2xl" />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="/dashboard/manageClasses"
                >
                  <MdMovie className="text-2xl" />
                  Manage Classes
                </NavLink>
              </li>
            </>
          ) : isAdmin === "instructor" ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="dashboard/profile"
                >
                  <CgProfile className="text-2xl" />
                  Instructor Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="/dashboard/addClass"
                >
                  <AiFillFolderAdd className="text-2xl" />
                  Add New class
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="/dashboard/myClasses"
                >
                  <MdClass className="text-2xl" />
                  My Classes
                </NavLink>
              </li>
            </>
          ) : isAdmin === "student"  ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="dashboard/profile"
                >
                  <CgProfile className="text-2xl" />
                  Student Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="/dashboard/SelectedClasses"
                >
                  <MdBookmarkAdd className="text-2xl" />
                  My Selected Classes
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-blue-600 text-black font-bold"
                      : "text-black font-bold"
                  }
                  to="/dashboard/enrolledClasses"
                >
                  <MdPayment className="text-2xl" />
                  My Enrolled Classes
                </NavLink>
              </li>
            </>
          ) : null}

          <div className="divider"></div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/sd">Instructors</NavLink>
          </li>
          <li>
            <NavLink to="/allClasses">Classes</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
