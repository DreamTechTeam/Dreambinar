import React, { useState } from "react";
import Head from "../components/Head";
import { Link } from "react-router-dom";
import { Avatar, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import strapi from "../api/strapi";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import setExpires from "../utils/setExpires";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  console.log(cookies);
  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await strapi.post("/auth/local", {
        identifier: data.email,
        password: data.password,
      });

      if (response.status === 200) {
        setCookie("token", response.data.jwt, {
          path: "/",
          expires: setExpires(),
        });
        setCookie("user", response.data.user, {
          path: "/",
          expires: setExpires(),
        });

        if (data.rememberLogin) {
          setCookie(
            "rememberLogin",
            {
              email: data.email,
              password: data.password,
              rememberLogin: data.rememberLogin,
            },
            { path: "/", expires: setExpires() }
          );
        } else {
          removeCookie("rememberLogin", { path: "/" });
        }

        toast.success("Login Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.warn(`${error.response.data.error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
        });
        return true;
      }
    }
    setLoading(false);
  };

  return (
    <>
      <Head title="Login" />

      <ToastContainer />
      <div className="grid grid-cols-1 grid-rows-1 h-screen md:grid-cols-2">
        <div className="py-6 px-6 md:py-0 md:px-10 lg:px-20 xl:px-40 my-auto">
          <div className="flex flex-col box-border">
            <div className="mb-3">
              <div className="mb-2 flex justify-center">
                <Avatar img="https://res.cloudinary.com/dreamtechteam/image/upload/v1657935772/dreambinar-logo_xrye3d.png" />
              </div>
              <h1 className="font-[Inter] text-2xl font-bold text-center mb-2">
                Sign in to your account
              </h1>
              <p className="text-center text-slate-400">
                Not Have an Account?{" "}
                <Link to="/register" className="text-green-600">
                  Sign Up
                </Link>
              </p>
            </div>

            <form
              className="flex flex-col gap-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              {loading && <div className="absolute inset-0 z-10 bg-white/20" />}
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Email*" />
                </div>
                <TextInput
                  color={errors.email && "failure"}
                  id="email"
                  type="email"
                  defaultValue={
                    cookies.rememberLogin ? cookies.rememberLogin.email : ""
                  }
                  disabled={loading}
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-red-700 text-sm pt-1">
                    * This field is required
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Password*" />
                </div>
                <TextInput
                  color={errors.password && "failure"}
                  id="password"
                  type="password"
                  defaultValue={
                    cookies.rememberLogin ? cookies.rememberLogin.password : ""
                  }
                  disabled={loading}
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-red-700 text-sm pt-1">
                    * This field is required
                  </p>
                )}
              </div>
              <div className="flex items-center my-2">
                <TextInput
                  id="rememberLogin"
                  type="checkbox"
                  color="primary"
                  defaultChecked={cookies.rememberLogin ? true : ""}
                  disabled={loading}
                  {...register("rememberLogin", { required: false })}
                />
                <label
                  htmlFor="rememberLogin"
                  className="ml-2 text-sm text-gray-900 dark:text-gray-300 hover:cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Button
                type="submit"
                style={{
                  width: "auto",
                }}
                disabled={loading}
                color="success"
              >
                {loading ? (
                  <div className="mr-3">
                    <Spinner size="sm" light={true} /> Loading...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="flex justify-center items-center text-sm mt-3">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>{" "}
              <p className="ml-2">
                <Link to="/" className="font-bold">
                  Back To Home
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:block bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIyfHxuYXR1cmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=80')] bg-cover">
          <div className="py-6 px-6 md:py-0 md:px-10 lg:px-20 xl:px-40 flex justify-center items-center flex-col text-white backdrop-brightness-50 backdrop-blur-sm h-screen">
            <h1 className="font-bold text-3xl font-[Inter] text-center">
              I love you in every universe
            </h1>
            <p>Dr. Stephen Strange</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
