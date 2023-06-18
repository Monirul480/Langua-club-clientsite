import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ManageClass = () => {
  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["allClass"], async () => {
    const res = await axiosSecure.get("/allClass");
    const data = await res.data;
    return data;
  });

  // toast 
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

  const handleDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be delete this class!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure(`/allClass/${user._id}`, {
          method: "DELETE",
        }).then((data) => {
          console.log(data);
          if (data.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "class  deleted successfully.", "success");
          }
        });
      }
    });
  };
  // activeStatus

  const handleActive = (user) => {
    axiosSecure(`/activeStatus/${user._id}`, {
      method: "PATCH",
    }).then((data) => {
      refetch();
      if(data.data.acknowledged){
        Toast.fire({
          icon: 'success',
          title: 'active is successfully'
        })
      }
    });
  };
  // pending status 
  const handlePending = (user) => {
    axiosSecure(`/pendingStatus/${user._id}`, {
      method: "PATCH",
    }).then((data) => {
      refetch();
      if(data.data.acknowledged){
        Toast.fire({
          icon: 'success',
          title: 'pending is successfully'
        })
      }
    });
  };

  const handleFeedback = async(user) => {

    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Write your feedBack',
      inputPlaceholder: 'Type your feedback here...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true
    })
    
    if (text) {
      fetch(`https://language-clube.vercel.app/classFeedback/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }), 
      })
      .then(data => {
        if(data?.ok){
          Toast.fire({
            icon: 'success',
            title: 'feedback is successfully'
          })
        }
      })
    }

  }

  return (
    <div className="w-full">
      <Helmet>
        <title>Bistro Boss | Manage users</title>
      </Helmet>
      <h3 className="text-3xl text-center font-semibold my-4">
        Manage Classes
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
              <th>FeedBack</th>
              <th>Pending</th>
              <th>Active</th>
              <th>Delete</th>
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
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                  onClick={() => handleFeedback(user)}
                  className="py-1 px-2 rounded-md disabled bg-yellow-400 hover:bg-yellow-500">
                    FeedBack
                  </button>
                </td>
                <td>
                  <button
                    disabled={user.status === "pending"}
                    onClick={() => handlePending(user)}
                    className={
                      user.status === "pending"
                        ? "line-through cursor-not-allowed bg-fuchsia-200 py-1 px-2 rounded-md"
                        : "py-1 px-2 rounded-md bg-fuchsia-400  hover:bg-fuchsia-500"
                    }
                  >
                    Pending
                  </button>
                </td>
                <td>
                  <button
                    disabled={user.status === "active"}
                    onClick={() => handleActive(user)}
                    className={
                      user.status === "active"
                        ? "line-through cursor-not-allowed bg-lime-300 py-1 px-2 rounded-md"
                        : "py-1 px-2 rounded-md bg-lime-400  hover:bg-lime-500"
                    }
                  >
                    Active
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-ghost bg-teal-600 text-white"
                  >
                    <FaTrashAlt></FaTrashAlt>
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

export default ManageClass;
