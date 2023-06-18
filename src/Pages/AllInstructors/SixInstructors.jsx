import React, { useEffect, useState } from 'react';
import SingleInstructors from './SingleInstructors';
import { NavLink } from 'react-router-dom';

const SixInstructors = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("https://language-clube.vercel.app/allInstructor")
          .then((res) => res.json())
          .then((data) => {
            const slicedData = data.slice(0, 6);
            setData(slicedData);
          });
      }, []);


    return (
        <div className="bg-white">
      <h1 className="text-center text-3xl  lg:pt-6 text-green-700">
      Popular Instructors Section {" "}
      </h1>
      <div className="grid lg:grid-cols-3 w-11/12 py-5 mx-auto gap-6">
        {data?.map((card) => (
          <SingleInstructors key={card._id} data={card}></SingleInstructors>
        ))}
      </div>
      <h1 className="text-center">
        <NavLink
        to='/allInstructors'
        className="py-2 text-xl mb-8  px-5 bg-green-500 hover:bg-green-600 rounded-lg">
          view all instructors
        </NavLink>
      </h1>
    </div>
    );
};

export default SixInstructors;