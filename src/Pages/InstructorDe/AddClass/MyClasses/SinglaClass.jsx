import React from 'react';

const SinglaClass = ({data}) => {
        const {availableSeats, image, className,  status, seats, feedBack} = data;

        const enrollStudents = seats - availableSeats;

        return (
            <div className="card ">
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
                <p className="card-title">{className}</p>
                <p className="text-lg">Status: <samp className="bg-blue-300 py-1 px-2 rounded-md text-black">{status}</samp></p>
                <p className="text-lg">Enroll Students: <samp className="text-blue-600">{enrollStudents}</samp></p>
                <p className="text-lg">FeedBack <samp className="text-blue-600">:{feedBack}</samp></p>
                <button className="btn text-white bg-green-600 hover:bg-green-800">
                    Update
                </button>
              </div>
            </div>
        );
};

export default SinglaClass;