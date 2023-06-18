import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../Provider/AuthProvider";

const Profile = () => {
    const { user} = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Profile</title>
      </Helmet>
      <div className="h-[100vh]">
      <h1 className="text-center text-3xl text-blue-500 font-semibold">
        Profile page
      </h1>
        <div className="justify-center mt-16 flex flex-col items-center">
            <img className="h-52 rounded-full" src={user?.photoURL} alt="" />
          <h2 className="mt-6 text-xl">Name: {user?.displayName}</h2>
          <p className="mt-2 text-xl">Email: {user?.email}</p>
          <button className="bg-green-500 hover:bg-green-600 text-base mt-2 py-1 px-3 rounded-md">Update Profile</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
