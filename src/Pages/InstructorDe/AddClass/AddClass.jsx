import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const AddClass = () => {
  const { register, handleSubmit, reset ,formState: { errors },} = useForm();
  const { user } = useContext(AuthContext);
  const name = user?.displayName;
  const email = user?.email;
  const instructor = user?.photoURL;
  const img_hosting_token = import.meta.env.VITE_IMAGE_UPLOAD_TOKEN;
  const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`
  const [axiosSecure] = useAxiosSecure();

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('image', data.image[0])
    fetch(img_hosting_url, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(imgResponse => {
        if(imgResponse.success){
            const imgURL = imgResponse.data.display_url;
            const {name, price, className, email, seats} = data;
            console.log(imgURL)
            const newItem = {name, price: parseFloat(price), seats: parseFloat(seats), className, email, availableSeats:parseFloat(seats),  image:imgURL, instructor, status: 'pending'}
            console.log(newItem);
            axiosSecure.post('/allClass', newItem)
            .then(data => {
                if(data.data.insertedId){
                    reset();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'class added successfully',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
        }
    })

};


  return (
    <><Helmet>
    <title>Bistro Boss | Add Class</title>
  </Helmet>
    <div className="p-5 w-full">
      <h1 className="text-center text-3xl text-blue-500 font-semibold">
        Add A Class
      </h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
       
      <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Class Name*</span>
          </label>
          <input
            type="text"
            placeholder="Class Name"
            {...register("className", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
          />
          {errors.className && (
                  <span className="text-red-600 text-base mt-2">Class name is required</span>
                )}
        </div>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Instructor Name</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            {...register("name", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
            defaultValue={name}
            readOnly
          />
        </div>
        
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text font-semibold">Instructor Email</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            {...register("email", { required: true, maxLength: 120 })}
            className="input input-bordered w-full "
            defaultValue={email}
            readOnly
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Price*</span>
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Price"
            className="input input-bordered w-full "
          />
           {errors.price && (
                  <span className="text-red-600 text-base mt-2">Price is required</span>
                )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Total seats*</span>
          </label>
          <input
            type="number"
            {...register("seats", { required: true })}
            placeholder="Seats"
            className="input input-bordered w-full "
          />
           {errors.seats && (
                  <span className="text-red-600 text-base mt-2">Seats is required</span>
                )}
        </div>
        <div className="form-control w-full my-4">
          <label className="label">
            <span className="label-text">Item Image*</span>
          </label>
          <input
            type="file"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full "
          />
          {errors.image && (
                  <span className="text-red-600 text-base mt-2">image is required</span>
                )}
        </div>
        <h1 className="text-center">

        <input className="bg-green-400 hover:bg-green-700 py-2 px-4 rounded-lg text-white text-xl mt-4" type="submit" value="Add Item" />
        </h1>
      </form>
    </div>
    </>
  );
};

export default AddClass;
