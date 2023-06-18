import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';

const EnrolledClasses = () => {
    const { user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(["orderPaid"], async () => {
      const res = await axiosSecure.get(`/orderPaid/${user.email}`);
      const data = await res.data;
      return data;
    });

    const handleDelete = (user) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be delete this class!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, remove it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure(`/orderCourse/${user._id}`, {
              method: "DELETE",
            }).then((data) => {
              console.log(data);
              if (data.data.deletedCount) {
                refetch();
                Swal.fire("remove!", "class  remove successfully.", "success");
              }
            });
          }
        });
      };
    
    return (
        <div className="w-full">
        <Helmet>
          <title>Bistro Boss | My Enrolled Classes</title>
        </Helmet>
        <h3 className="text-3xl text-center font-semibold my-4">
        My Enrolled Classes
        </h3>
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr className="bg-slate-100">
                <th>#</th>
                <th>image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Price</th>
                <th>Enrolled</th>
                <th>Paid</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={user.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{user.className}</td>
                  <td>{user.email}</td>
                  <td>$ {user.price}</td>
                 
                  <td>
                    <button
                      className={
                         "bg-green-400  py-1 px-2 rounded-md"
                      }
                    >
                      Enrolled
                    </button>
                  </td>
                  <td>
                    <button
                      className={
                         "bg-yellow-400   py-1 px-2 rounded-md"
                      }
                    >
                      Paid
                    </button>
                  </td>
                  <td>
                    <button
                    onClick={() => handleDelete(user)}
                      className="bg-red-400 hover:bg-red-500  py-1 px-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default EnrolledClasses;

{/* <Helmet>
        <title>Bistro Boss | All users</title>
      </Helmet> */}