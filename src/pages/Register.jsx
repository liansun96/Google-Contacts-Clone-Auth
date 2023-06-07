import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useRegisterMutation } from "../redux/authApi";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import BaseLayout from "../Components/BaseLayout";
import { useRegisterMutation } from "../redux/api/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirm] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const nav = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const [invalidName, setInvalidName] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [invalidConfirm, setInvalidConfirm] = useState("");

  const registerHandler = async (e) => {
    try {
      const user = { name, email, password, password_confirmation };
      e.preventDefault();
      const { data } = await register(user);
      // console.log(data);
      !data?.success && setInvalidName("invalid name");
      !data?.success && setInvalidEmail("invalid email");
      !data?.success && setInvalidPassword("invalid password");
      !data?.success && setInvalidConfirm("invalid password confirmation");
      data?.success && nav("/login");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <BaseLayout>
        <div className="flex flex-col">
            <h2 className="text-center text-2xl text-gray-700 my-3 font-semibold">
              Sign up
            </h2>
          <form
            onSubmit={registerHandler}
            className=" w-96 px-5 pt-0 flex flex-col "
          >
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
            <p className="my-2 mx-auto  text-sm text-gray-500 font-bold">OR</p>
            </div>
            <div className="mb-4">
              <input
                onChange={(e) => {
                  setName(e.target.value);
                  setInvalidName("");
                }}
                type="name"
                id="name"
                className={
                  name.length < 3 && invalidName
                    ? "shadow-sm focus-within:outline-none bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg block w-full p-2.5 "
                    : "shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                }
                placeholder="Enter your name..."
              />
              {name.length < 3 && (
                <p className="text-red-500 text-sm">{invalidName}</p>
              )}
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
                  email.length <= 0 && invalidEmail
                    ? "shadow-sm focus-within:outline-none bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg block w-full p-2.5 "
                    : "shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                }
                placeholder="Enter your email..."
              />
              {email.length <= 0 && (
                <p className="text-red-500 text-sm">{invalidEmail}</p>
              )}
            </div>
            <div className="mb-4 relative">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                  setInvalidPassword("");
                }}
                type={showPassword ? "text" : "password"}
                className={
                  password.length < 8 && invalidPassword
                    ? "shadow-sm focus-within:outline-none bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg block w-full p-2.5 "
                    : "shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                }
                placeholder="Enter your password..."
              />
              {password.length < 8 && (
                <p className="text-red-500 text-sm">{invalidPassword}</p>
              )}
              <label
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0.5 right-0 px-5 py-3 cursor-pointer"
              >
                {!showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
              </label>
            </div>
            <div className="mb-4 relative">
              <input
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                  setInvalidConfirm("");
                }}
                type={showPasswordConfirm ? "text" : "password"}
                className={
                  invalidConfirm
                    ? "shadow-sm focus-within:outline-none bg-gray-50 border border-red-500 text-red-500 text-sm rounded-lg block w-full p-2.5 "
                    : "shadow-sm focus-within:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                }
                placeholder="Confirm your password..."
              />
              {password_confirmation.length < 3 && (
                <p className="text-red-500 text-sm">{invalidConfirm}</p>
              )}
              <label
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                className="absolute top-0.5 right-0 px-5 py-3 cursor-pointer"
              >
                {!showPasswordConfirm ? <RxEyeClosed /> : <RxEyeOpen />}
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={
                !isLoading
                  ? " text-white w-full bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  : " text-gray-300 w-full bg-gray-300  font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              }
            >
              Sign up
            </button >
          </form>
          <div className="flex justify-center gap-3 my-5 p-5">
            <p>Already have an account?</p>
            <Link to={"/login"}>
              <p className="text-blue-600">Log in</p>
            </Link>
          </div>
        </div>
        <div className="w-96 hidden md:block">
              {/* <img src="https://t3.ftcdn.net/jpg/01/28/18/14/240_F_128181482_m6jwZBkN5N17zPtliXUSxhOMbGvEAqBm.jpg" alt="" /> */}
              <img src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?size=626&ext=jpg&ga=GA1.1.1130450271.1685770899&semt=sph" alt="" />
        </div>
      </BaseLayout>
    </>
  );
};

export default Register;
