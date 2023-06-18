import React, { useContext } from "react";
import loginImag from "../../assets/login.jpg";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaGooglePlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { googleSignIn, signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signIn(data.email, data.password)
    .then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      reset();
      Toast.fire({
        icon: 'success',
        title: "login successfully"
      })
      navigate(from, { replace: true });
    })
    .catch((error) => {
      Toast.fire({
        icon: 'warning',
        title: `error ${error}`
      })
    });
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
                        title: "login successfully"
                      })
                        navigate(from, { replace: true });
                    })
            })
  };

  return (

    <div className="bg-white lg:flex lg:px-36">
      
      <div className="lg:w-1/3 bg-white mx-auto lg:order-1">
      <Helmet>
        <title>LanguageClub | Login</title>
      </Helmet>
        <div className="hero min-h-screen">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-center pt-5 font-bold text-2xl">Login !</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-3">
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
                    })}
                    placeholder="password"
                    className="input input-bordered w-full pr-10"
                  />
                  <div
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>

              <div className="form-control mt-6">
                <input
                  className="btn bg-blue-600 hover:bg-blue-800 text-white"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <h1 className="text-center pb-2">
              Are you new to language club!
              <Link className="text-blue-600" to="/register">
                {" "}
                Register
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

export default Login;
