import useOrder from '../../../hooks/useOrder';
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SelectedClass = () => {
    const [allOrder, refetch] = useOrder();
    const [axiosSecure] = useAxiosSecure();
    // remove selected class 
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

      const payMoney = (user) => {
        axiosSecure(`/orderCourse/${user._id}`, {
          method: "PATCH",
        }).then((data) => {
          console.log(data);
          if (data.data.acknowledged) {
            axiosSecure(`/updateSates/${user.orderItemId}`, {
              method: "PATCH",
            }).then((data) => {
              console.log(data);
              if (data.data.acknowledged) {
                refetch();
                Swal.fire("Success", "payment successfully.", "success");
              }
            });
            
          }
        });
      }
      

    return (
        <div className="w-full">
      <Helmet>
        <title>Bistro Boss | selected Class</title>
      </Helmet>
      <h3 className="text-3xl text-center font-semibold my-4">
        Selected Classes
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
              <th>selected</th>
              <th>Pay</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {allOrder?.map((user, index) => (
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
                    selected
                  </button>
                </td>
                <td>
                  <button
                  onClick={() => payMoney(user)}
                    className={
                       "bg-yellow-400 hover:bg-yellow-500  py-1 px-2 rounded-md"
                    }
                  >
                    Pay
                  </button>
                </td>
                <td>
                  <button
                  onClick={() => handleDelete(user)}
                    className="bg-red-400 hover:bg-red-500  py-1 px-2 rounded-md"
                  >
                    Remove
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

export default SelectedClass;

