import React from "react";

const SingleInstructors = ({ data }) => {
  const { profile, name, email } = data;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="w-full h-72" src={profile} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{email}</p>
        <button className="bg-green-400 hover:bg-green-500 px-3 py-1 rounded-lg">Sell class</button>
      </div>
    </div>
  );
};

export default SingleInstructors;
