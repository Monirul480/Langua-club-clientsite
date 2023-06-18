import React, { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../../Provider/AuthProvider';
import SinglaClass from './SinglaClass';
import { Helmet } from 'react-helmet-async';

const MyClasses = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();
    const { data: allClasses = [] } = useQuery(["classes"], async () => {
        const res = await axiosSecure.get(`/instructor/${user.email}`);
        const data = await res.data;
        return data;
      });
    return (
        <>
        <Helmet>
        <title>Bistro Boss | My Class</title>
      </Helmet>
      <h1 className="text-center text-3xl pt-4 text-green-700">
        My Classes{" "}
      </h1>
      <div className="grid lg:grid-cols-3 w-11/12 py-5 mx-auto gap-6">
        {allClasses?.map((card) => (
          <SinglaClass key={card._id} data={card}></SinglaClass>
        ))}
      </div>
    </>
    );
};

export default MyClasses;