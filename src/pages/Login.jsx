import React, { useState } from "react";
import Logo from "../images/contact-Logo.svg";

import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/services/authSlice";
import { Dna, FallingLines, RotatingLines, ThreeDots } from "react-loader-spinner";

const Login = () => {
  const nav = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
 

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const user = { email, password };
      const { data } = await login(user);
      console.log(data);
      dispatch(addUser({ user: data?.user, token: data?.token }));
      if (data.success) nav("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <div className="w-[450px] h-[500px] border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col items-center space-y-3">
            <img src={Logo} className="w-[20%]" alt="" />
            <h4 className="font-semibold text-xl">Login Account</h4>
          </div>

          <form onSubmit={handleLogin} className="mt-4 space-y-8 select-none">
            <div className="group p-3 border border-slate-200 rounded relative">
              <h2 className="absolute -top-6 translate-x-1 translate-y-1/2 bg-white text-sm text-slate-500 px-1">
                Email
              </h2>
              <input
                type="text"
                className="focus:outline-none w-[335px] placeholder:one"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* <span className='text-primary-100 text-sm font-semibold cursor-pointer !mt-4'>Forgot email?</span> */}
            <div className="group p-3 border border-slate-200 rounded relative">
              <h2 className="absolute -top-6 translate-x-1 translate-y-1/2 bg-white text-sm text-slate-500 px-1">
                Password
              </h2>
              <input
                type={show ? "text" : "password"}
                className="focus:outline-none w-[335px] placeholder:one"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="" type="reset" onClick={() => setShow(!show)}>
                {show ? (
                  <BiHide className="absolute cursor-pointer text-xl right-4 top-4 " />
                ) : (
                  <BiShow className="absolute cursor-pointer text-xl right-4 top-4 " />
                )}
              </button>
            </div>
            <div className="w-[360px] flex justify-between items-center select-none">
              <Link to="/register">
                <p className="py-2 px-6 text-primary-100 font-semibold p-2 -ml-2 rounded hover:bg-secondary-200 duration-200 hover:text-primary-200 cursor-pointer">
                  Register
                </p>
              </Link>
              <button
                disabled={isLoading && true}
                type="submit"
                className="w-[80px] h-[40px] flex justify-center items-center text-sm font-semibold bg-primary-100 duration-200 hover:bg-primary-200 rounded"
              >
                {isLoading ? (
                  <ThreeDots 
                  height="40" 
                  width="40" 
                  radius="9"
                  color="#fafafa" 
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                   />
                ) : (
                  <p className="text-white">Login</p>
                )}
              </button>
              {/* {isLoading ? (
                <FallingLines
                color="#9173e9"
                width="40"
                visible={true}
                ariaLabel='falling-lines-loading'
              />
              ) : (
                <button
                  type="submit"
                  className="py-2 px-6 text-sm font-semibold bg-primary-100 duration-200 hover:bg-primary-200 rounded"
                >
                  Login
                </button>
              )} */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
