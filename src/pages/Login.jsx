import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../redux/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import BaseLayout from "../Components/BaseLayout";
import { useLoginMutation } from "../redux/api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  console.log(invalidPassword);

  const loginHandler = async (e) => {
    try {
      const user = { email, password };
      e.preventDefault();
      const { data } = await login(user);
      console.log(data);
      data?.success && nav("/");
      !email.includes("@gmail.com") && setInvalidEmail("invalid email");
      !data?.success && password.length <8
        ? setInvalidPassword("invalid password")
        : setInvalidPassword("");
      dispatch(addUser({ user: data.user, token: data.token }));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <BaseLayout>
        <div className="flex flex-col md:w-96">
          <h2 className="text-center text-2xl text-gray-700 my-3 font-semibold">
            Log in
          </h2>
          <p className="text-center px-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. expedita.
          </p>
          <form onSubmit={loginHandler} className=" p-5 pt-0 flex flex-col">
            <button className="text-blue-500 w-full flex items-center justify-center gap-3 bg-gray-50 hover:shadow-lg  font-medium rounded-lg px-5 py-2 text-center mt-4">
              <span>
                <img
                  className="w-7"
                  src="https://img.icons8.com/?size=1x&id=17949&format=png"
                  alt=""
                />
              </span>
              Login with Google
            </button>
            <div className="flex">
              <p className="my-2 mx-auto  text-sm text-gray-500 font-bold">
                OR
              </p>
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInvalidEmail("");
                }}
                type="email"
                id="email"
                className={
                  invalidEmail
                    ? "shadow-sm focus-within:outline-none bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg block w-full p-2.5 "
                    : "shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                }
                placeholder="Enter your email..."
              />
              {<p className="text-red-500 text-sm">{invalidEmail}</p>}
            </div>
            <div className="mb-4 relative">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setInvalidPassword("");
                }}
                type={showPassword ? "text" : "password"}
                id="password"
                className={
                  invalidPassword
                    ? "shadow-sm focus-within:outline-none bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg block w-full p-2.5 "
                    : "shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                }
                placeholder="Enter your password..."
              />
              {<p className="text-red-500 text-sm">{invalidPassword}</p>}
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0.5 right-0 px-5 py-3 cursor-pointer"
              >
                {!showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={
                !isLoading
                  ? " text-white w-full bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  : " text-gray-300 w-full bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              }
            >
              Log in
            </button>
          </form>
          <div className="flex justify-center gap-3 my-2 p-5">
            <p>Don't have an account?</p>
            <Link to={"/register"}>
              <p className="text-blue-600">Sign up</p>
            </Link>
          </div>
        </div>
        <div className="md:w-96 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?size=626&ext=jpg&ga=GA1.1.1130450271.1685770899&semt=sph"
            alt=""
          />
        </div>
      </BaseLayout>
    </>
  );
};

export default Login;
