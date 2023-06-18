import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Error from "../Pages/Error/Error";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Home from "../Pages/Home/Home/Home";
import AllClasses from "../Pages/Home/Classes/AllClasses";
import Dashboard from "../Layouts/Dashboard";
import AllUsers from "../Pages/AdminDe/AllUsers/AllUsers";
import ManageClass from "../Pages/AdminDe/ManageClass/ManageClass";
import Profile from "../Pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import SelectedClass from "../Pages/userDe/MySelectedClass/SelectedClass";
import EnrolledClasses from "../Pages/userDe/EnrolledClasses/EnrolledClasses";
import AddClass from "../Pages/InstructorDe/AddClass/AddClass";
import MyClasses from "../Pages/InstructorDe/AddClass/MyClasses/MyClasses";
import AllInstructors from "../Pages/AllInstructors/AllInstructors";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error></Error>,
      children: [
        {
          path: '/',
          element: <Home></Home>
        },
        {
          path: '/allClasses',
          element: <AllClasses></AllClasses>
        },
        {
          path: '/allInstructors',
          element: <AllInstructors></AllInstructors>
        },
        {
          path: '/login',
          element: <Login></Login>
        },
        {
          path: '/register',
          element: <Register></Register>
        },
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute> , 
      children: [
        {
          path: '/dashboard/*', 
          element: <Profile></Profile>
        },
        {
          path: 'allUsers', 
          element: <AllUsers></AllUsers>
        },
        {
          path: 'manageClasses', 
          element: <ManageClass></ManageClass>
        },
        {
          path: 'SelectedClasses', 
          element: <SelectedClass></SelectedClass>
        },
        {
          path: 'enrolledClasses', 
          element: <EnrolledClasses></EnrolledClasses>
        },
        {
          path: 'addClass', 
          element: <AddClass></AddClass>
        },
        {
          path: 'myClasses', 
          element: <MyClasses></MyClasses>
        },
      ]
    }
      
    
  ]);

  export default router;
