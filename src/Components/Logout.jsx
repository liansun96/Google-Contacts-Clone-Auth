import React from "react";
import { MdLogout } from "react-icons/md";
import { useLogoutMutation } from "../redux/api/authApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { removeUser } from "../redux/services/authSlice";
import { useNavigate } from "react-router-dom";
import { RiUserAddLine } from "react-icons/ri";
import { BsDot } from "react-icons/bs";

const Logout = ({ show, user }) => {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    const { data } = await logout(token);
    dispatch(removeUser());
    if (data?.success) nav("/login");
    console.log(data);
  };

  return (
    <div className={show ? "drop scale-y-1" : "drop scale-y-0"}>
      <div className="w-[95%] h-[139px] mx-auto bg-white cus-shadow-sm rounded-[20px] mt-2">
        <div className="flex justify-start items-center ps-9 space-x-3 py-5  px-6">
          <div className="w-[20%]">
            <div className="w-[45px] h-[45px]  ring-secondary-500 select-none cursor-pointer flex justify-center items-center rounded-full bg-yellow-700">
              <span className="text-xl text-white">
                {user?.name.charAt().toUpperCase()}
              </span>
            </div>
          </div>

          <div className="w-[80%]">
            <p className="font-semibold leading-tight first-letter:capitalize">
              {user?.name}
            </p>
            <p className="font-semibold leading-tight">{user?.email}</p>
          </div>
        </div>
        <div className="flex cursor-pointer justify-start items-center ps-12 px-6 py-[15px] rounded-bl-[20px] rounded-br-[20px] hover:bg-primary-300">
          <div className="w-[20%] mx-auto">
            <RiUserAddLine className="text-zinc-600 text-2xl" />
          </div>
          <div className="w-[80%] text-start">
            <p className="font-semibold ">Add another account</p>
          </div>
        </div>
      </div>
      <div
        onClick={handleLogout}
        className="flex cursor-pointer justify-start items-center ps-[60px] px-6 py-[15px] hover:bg-primary-300"
      >
        <div className="w-[20%] mx-auto">
          <MdLogout className="text-zinc-600 text-2xl" />
        </div>
        <div className="w-[80%] text-start me-4">
          <p className="font-semibold ">Sign out</p>
        </div>
      </div>
      <hr className="w-full border-b-[1px] border-gray-200" />
      <div className="flex justify-center space-x-2 items-center py-3">
        <p className="text-xs font-semibold hover:bg-primary-300 rounded px-2 py-1 ">Privacy Policy</p>
        <BsDot className="mt-2"/>
        <p className="text-xs font-semibold hover:bg-primary-300 rounded px-2 py-1 ">Terms of service</p>
      </div>
    </div>
  );
};
export default Logout;
