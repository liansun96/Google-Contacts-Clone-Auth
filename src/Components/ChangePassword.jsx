import React, { useContext } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import ChangePasswordModal from "./ChangePasswordModel";
import { AiFillPrinter } from "react-icons/ai";
import { ToggleContext } from "../Context/ToggleProvider";

const ChangePassword = ({ showSetting}) => {

  const {toggleModal,modal} = useContext(ToggleContext)

  return (
    <div
      className={
        showSetting
          ? "change-password-drop scale-y-1"
          : "change-password-drop scale-y-0"
      }
    >
      <div
        onClick={toggleModal}
        className="flex justify-start items-center px-6 py-[11px] space-x-6 hover:bg-secondary-300"
      >
        <RiLockPasswordLine className="text-secondary-500 text-xl" />
        <p className="font-semibold text-sm">Change Password</p>
      </div>
      <div onClick={()=>window.print()} className="flex justify-start items-center px-6 py-[11px] space-x-6 hover:bg-secondary-300">
        <AiFillPrinter className="text-secondary-500 text-xl" />
        <p className="font-semibold text-sm">Print</p>
      </div>
      {modal && <ChangePasswordModal />}
    </div>
  );
};

export default ChangePassword;
