import React from "react";
import { Link, useRouteError } from "react-router-dom";

import eor from "../../assets/error.png";
import './Error.css'

const Error = () => {
  const { error} = useRouteError();

  return (
    <div className="">
        <div className="w-full text-center">
          <div className="">
            <img className="erre w-1/2 mx-auto mt-10"  src={eor} alt="" />
          </div>
          <p className="text-2xl font-semibold md:text-3xl mb-8">
            {error?.message}
          </p>
          <button className="btn btn-primary normal-case">
            <Link className="hover:text-white" to="/">
              Back to homepage
            </Link>
          </button>
        </div>
      </div>
  );
};

export default Error;
