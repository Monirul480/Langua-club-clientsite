import React, { useContext } from 'react';
import useAdmin from '../../../hooks/useAdmin';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const SingleCard = ({data}) => {
  const [isAdmin] = useAdmin();
    const {availableSeats, image, name,  price, seats,className, _id} = data;
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const location = useLocation();
    
    const addToCart = () => {
      if(user && user.email){
        const cartItem = {orderItemId: _id, money: 'unPaid', className, image, price, email: user.email}
        fetch('https://language-clube.vercel.app/orderCourse', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(cartItem)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                // refetch(); 
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'add course successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }
      else{
        Swal.fire({
          title: 'Are you sure?',
          text: "You can add product firs login!",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes,  Login!'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login', { state: { from: location } });
            
          }
        })
      }

    }

    return (
     
        <div className={availableSeats === 0 ? "card cursor-not-allowed bg-red-200": " card"}>
          <figure>
          <div className="relative overflow-hidden bg-cover bg-no-repeat">
            <img
              src={image}
              className="transition rounded-md duration-300 ease-in-out hover:scale-110"
              alt="Louvre"
            />
          </div>
          </figure>
          <div className="card-body leading-loose mt-4 p-0">
            <p className="card-title">course Name:  {className}</p>
            <p className="text-lg text-slate-500"><span className="font-bold text-black">Instructor name :</span> {name}</p>
            <p className="text-lg">Available seats: <samp className="text-blue-600">{availableSeats}</samp></p>
            <p className="text-lg">Total seats: <samp className="text-blue-600">{seats}</samp></p>
            <p className="text-lg">Price: <samp className="text-blue-600">${price}</samp></p>
            <button 
            onClick={() => addToCart()}
            className={isAdmin === 'admin' || isAdmin === 'instructor' || availableSeats === 0 ? "btn bg-green-300 hover:bg-green-300 cursor-not-allowed" : "btn bg-green-600" }>
                add course
            </button>
          </div>
        </div>
    );
};

export default SingleCard;