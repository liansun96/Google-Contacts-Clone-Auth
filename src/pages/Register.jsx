import React, { useState } from "react";
import Logo from "../images/contact-Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { useRegisterMutation } from "../redux/api/authApi";
import { ThreeDots } from "react-loader-spinner";

const Register = () => {
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = { name, email, password, password_confirmation };
    const {data} = await register(user);
    console.log(data, isError);
    if (data?.success) nav("/login");    
  };

  return (
    <div>
      <div className="min-h-[100vh] flex flex-col justify-center items-center">
        <div className="w-[450px] h-[600px] border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8">
          <div className="flex flex-col items-center space-y-3">
            <img src={Logo} className="w-[20%]" alt="" />
            <h4 className="font-semibold text-xl">Register Account</h4>
          </div>

          <form onSubmit={handleRegister} className="mt-4 space-y-8">
            <div className="group p-3 border border-slate-200 rounded relative">
              <h2 className="absolute -top-6 translate-x-1 translate-y-1/2 bg-white text-sm text-slate-500 px-1">
                Name
              </h2>
              <input
                type="text"
                className="focus:outline-none w-[335px] placeholder:none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="group p-3 border border-slate-200 rounded relative">
              <h2 className="absolute -top-6 translate-x-1 translate-y-1/2 bg-white text-sm text-slate-500 px-1">
                Email
              </h2>
              <input
                type="text"
                className="focus:outline-none w-[335px] placeholder:none"
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
                className="focus:outline-none w-[335px] placeholder:none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="reset" onClick={() => setShow(!show)}>
                {show ? (
                  <BiHide className="absolute top-4 right-4 text-xl cursor-pointer" />
                ) : (
                  <BiShow className="absolute top-4 right-4 text-xl cursor-pointer" />
                )}
              </button>
            </div>
            <div className="group p-3 border border-slate-200 rounded relative">
              <h2 className="absolute -top-6 translate-x-1 translate-y-1/2 bg-white text-sm text-slate-500 px-1">
                Password_confirmation
              </h2>
              <input
                type={show1 ? "text" : "password"}
                className="focus:outline-none w-[335px] placeholder:none"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
              <button type="reset" onClick={() => setShow1(!show1)}>
                {show1 ? (
                  <BiHide className="absolute top-4 right-4 text-xl cursor-pointer" />
                ) : (
                  <BiShow className="absolute top-4 right-4 text-xl cursor-pointer" />
                )}
              </button>
            </div>
            <div className="w-[360px] flex justify-between items-center">
              <Link to="/login">
                <p className="py-2 px-6 text-primary-100 font-semibold p-2 -ml-2 rounded hover:bg-secondary-200 duration-200 hover:text-primary-200 cursor-pointer">
                  Login
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
                  <p className="text-white">Register</p>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
