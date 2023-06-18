import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaGooglePlus } from "react-icons/fa";
import loginImag from "../../assets/login.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { googleSignIn, createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

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

  // create new user
  const onSubmit = (data) => {
    createUser(data.email, data.password)
            .then(result => {

                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const saveUser = { name: data.name, email: data.email, role: 'student', profile: data.photoURL }
                        fetch('https://language-clube.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Toast.fire({
                                      icon: 'success',
                                      title: "user Create successfully"
                                    })
                        
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => {
                      console.log(error);
                    })
            })
            .catch(error => {
              Toast.fire({
                icon: 'warning',
                title: `error ${error}`
              })
            })
  };

  //create new user with google
  const handleGoogleSignIn = () => {
    googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: 'student', profile: loggedInUser.photoURL }
                fetch('https://language-clube.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                      Toast.fire({
                        icon: 'success',
                        title: "user Create successfully"
                      })
                        navigate(from, { replace: true });
                    })
            })
  };

  return (
    <div className="bg-white lg:flex lg:px-36">
      <Helmet>
        <title>LanguageClub | Register</title>
      </Helmet>
      <div className="lg:w-1/3 lg:order-1">
        <div className="hero min-h-screen">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center pt-5 font-bold text-2xl">Register !</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  name="name"
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo URL"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="flex relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    })}
                    placeholder="password"
                    className="input input-bordered w-full pr-10"
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> :  <FaEyeSlash />}
                  </div>
                </div>
                {/* ...existing error messages */}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    validate: (value) => value === watch("password"),
                  })}
                  placeholder="confirm password"
                  className="input input-bordered"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600">Passwords do not match</p>
                )}
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn bg-blue-600 hover:bg-blue-800 text-white"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <h1 className="text-center pb-2">
              Already have an account!
              <Link className="text-blue-600" to="/login">
                {" "}
                Login
              </Link>
            </h1>
            <div className="divider px-3">OR</div>
            <div className="flex text-black items-center justify-center  border-2 mb-8 border-black  py-2 rounded-2xl mx-6">
              <FaGooglePlus onClick={handleGoogleSignIn} className="text-3xl" />
              <p className="pl-2">Sign in with Google</p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3  lg:order-2 justify-center items-center flex flex-col">
        <img src={loginImag} alt="" />
      </div>
    </div>
  );
};

export default Register;
