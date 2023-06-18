import React, { useEffect, useState } from 'react';
import SingleInstructors from './SingleInstructors';
import { Helmet } from 'react-helmet-async';

const AllInstructors = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch("https://language-clube.vercel.app/allInstructor")
          .then((res) => res.json())
          .then((data) => {
            
            setData(data);
          });
      }, []);
    return (
        <div className="bg-white pt-14">
            <Helmet>
            <title>LanguageClub | All Instructors</title>
            </Helmet>
        <h1 className="text-center text-3xl  lg:pt-6 text-green-700">
        Popular Instructors Section {" "}
        </h1>
        <div className="grid lg:grid-cols-3 w-11/12 py-5 mx-auto gap-6">
          {data?.map((card) => (
            <SingleInstructors key={card._id} data={card}></SingleInstructors>
          ))}
        </div>
      </div>
    );
};

export default AllInstructors;