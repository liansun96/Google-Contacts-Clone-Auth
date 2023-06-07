import Cookies from "js-cookie";
import Logo from "../images/reset-password.png";
import React, { useContext, useState } from "react";
import { useUpdatePasswordMutation } from "../redux/api/authApi";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { BiHide, BiShow } from "react-icons/bi";
import { ToggleContext } from "../Context/ToggleProvider";
import { TbCircleKey, TbCircleKeyFilled } from "react-icons/tb";

const ChangePasswordModal = () => {
  const token = Cookies.get("token");
  const [updatePassword, { isLoading, error, isError }] =
    useUpdatePasswordMutation(token);
  const nav = useNavigate();

  const { toggleModal, modal } = useContext(ToggleContext);

  const [current_password, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    const changedPassword = {
      current_password,
      password,
      password_confirmation,
    };
    const { data } = await updatePassword({ token, changedPassword });
    console.log(data, isError, error);
    if (data?.success) nav("/login");
  };

  return (
    <div
      onClick={toggleModal}
      className="fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[450px] h-[500px] bg-white border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8"
      >
        <div className="flex justify-center items-center space-x-5">
          <img src={Logo} className="w-[15%]" alt="" />
          <h4 className="font-semibold text-xl">Change Password</h4>
        </div>

        <form onSubmit={changePasswordHandler} className="mt-4 space-y-8">
          <div className="flex items-start">
            <div className="w-[10%]">
              <TbCircleKey className="text-secondary-500 text-2xl mt-4" />
            </div>
            <div className="w-[90%] flex flex-col space-y-2 mt-3 relative">
              <input
                type={show ? "text" : "password"}
                placeholder="current password"
                value={current_password}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border-b-[1px] border-secondary-200 outline-none py-2 "
              />
              <button className="" type="reset" onClick={() => setShow(!show)}>
                {show ? (
                  <BiHide className="absolute cursor-pointer text-xl right-4 top-2 " />
                ) : (
                  <BiShow className="absolute cursor-pointer text-xl right-4 top-2 " />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-[10%]">
              <TbCircleKeyFilled className="text-secondary-500 text-2xl mt-4" />
            </div>
            <div className="w-[90%] flex flex-col space-y-2 mt-3 relative">
              <input
                type={show1 ? "text" : "password"}
                placeholder="new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-[1px] border-secondary-200 outline-none py-2 "
              />
              <button
                className=""
                type="reset"
                onClick={() => setShow1(!show1)}
              >
                {show1 ? (
                  <BiHide className="absolute cursor-pointer text-xl right-4 top-2 " />
                ) : (
                  <BiShow className="absolute cursor-pointer text-xl right-4 top-2 " />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-[10%]">
              <TbCircleKeyFilled className="text-secondary-500 text-2xl mt-4" />
            </div>
            <div className="w-[90%] flex flex-col space-y-2 mt-3 relative">
              <input
                type={show2 ? "text" : "password"}
                placeholder="password confirmation"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className="border-b-[1px] border-secondary-200 outline-none py-2 "
              />
              <button
                className=""
                type="reset"
                onClick={() => setShow2(!show2)}
              >
                {show2 ? (
                  <BiHide className="absolute cursor-pointer text-xl right-4 top-2 " />
                ) : (
                  <BiShow className="absolute cursor-pointer text-xl right-4 top-2 " />
                )}
              </button>
            </div>
          </div>

          <div className="w-[360px] flex justify-between items-center">
            <div onClick={toggleModal}>
              <p className="py-2 px-6 text-primary-100 font-semibold p-2 -ml-2 rounded hover:bg-secondary-200 duration-200 hover:text-primary-200 cursor-pointer">
                Cancel
              </p>
            </div>

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
                <p className="text-white">Save</p>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
