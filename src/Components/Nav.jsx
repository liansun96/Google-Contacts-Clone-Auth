import React, { useContext, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { RiSettings5Line } from "react-icons/ri";
import { CgMenuGridO } from "react-icons/cg";
import { RiUser6Line } from "react-icons/ri";
import ContactLogo from "../images/contact-logo.svg";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setSearchContact } from "../redux/services/contactSlice";
import Logout from "./Logout";
import GoogleApps from "./GoogleAppsScroll/GoogleApps";
import ChangePassword from "./ChangePassword";
import { ToggleContext } from "../Context/ToggleProvider";


const Nav = () => {

  const user = JSON.parse(Cookies.get("user"));
  const dispatch = useDispatch();

  const searchContact = useSelector(
    (state) => state.contactSlice.searchContact
  );
  // console.log(searchContact);

  const {toggleSitebar,isOpen} = useContext(ToggleContext)

 

  const [show, setShow] = useState(false);
  const handleToggle = () => {
    setShow(!show)
    setShowApp(false)
    setShowSetting(false)
  };

  const [showApp, setShowApp] = useState(false);
  const handleToggleApp = () => {
    setShowApp(!showApp)
    setShow(false)
    setShowSetting(false)
  };

  const [showSetting, setShowSetting] = useState(false);
  const handleToggleSetting = () => {
    setShowSetting(!showSetting)
    setShowApp(false)
    setShow(false)
  };



  return (
    <>
      <div className="flex justify-between items-center p-2">
        <div className="w-[15%] flex items-center space-x-2">
          <div className="relative group">
            <button
              onClick={toggleSitebar}
              className="w-[50px] h-[50px] flex justify-center items-center rounded-full hover:bg-secondary-200"
            >
              <BiMenu className="text-secondary-500 text-2xl" />
            </button>
            <span className="hidden group-hover:block absolute top-[50px] -left-2 w-[100px] p-1 bg-secondary-500 text-white font-bold rounded scale-[80%]">
              <p className="ml-1">Main menu</p>
            </span>
          </div>
          <img src={ContactLogo} className="w-[40px]" alt="" />
          <h1 className="text-2xl text-slate-600">Contacts</h1>
        </div>
        <div className="w-[70%] flex justify-between items-center">
          <div className="w-[68%] h-[48px] flex justify-start items-center space-x-4 rounded-lg bg-secondary-300">
            <div className="w-[40px] h-[40px] flex justify-center items-center rounded-full hover:bg-secondary-200 ml-2">
              <AiOutlineSearch className="text-secondary-500 text-2xl font-bold" />
            </div>
            <input
            type="text"
            placeholder="Search"
            onChange={(e) => dispatch(setSearchContact(e.target.value))}
            value={searchContact}
            className="outline-none w-[90%] bg-secondary-300"
          />
          </div>
          <div className="flex justify-center items-center rounded-full space-x-6">
            <div className="relative group cursor-pointer">
              <BsQuestionCircle className="text-secondary-500 text-xl" />
              <span className="hidden z-20 group-hover:block absolute top-6 -left-10 w-[100px] p-2 bg-secondary-500 text-white font-bold rounded scale-[70%]">
                <p>Help menu</p>
              </span>
            </div>
            <div onClick={handleToggleSetting} className="relative group cursor-pointer">
              <RiSettings5Line className="text-secondary-500 text-2xl" />
              <span className="hidden z-20 group-hover:block absolute top-7 -left-12 w-[125px] p-2 bg-secondary-500 text-white font-bold rounded scale-[70%]">
                <p>Settings menu</p>
              </span>
            </div>
            <ChangePassword showSetting={showSetting} />
          </div>
        </div>
        <div className="w-[7%] flex items-center space-x-4">
          <div onClick={handleToggleApp} className="relative group w-[40px] h-[40px] cursor-pointer flex justify-center items-center rounded-full hover:bg-secondary-200">
            <CgMenuGridO className="text-secondary-500 text-2xl" />
            <span className="hidden z-10 group-hover:block absolute top-12 -left-10 w-[120px] p-2 bg-secondary-500 text-white font-bold rounded scale-[70%]">
                <p>Google Apps</p>
              </span>
          </div>
          <GoogleApps showApp={showApp} />
          <div className="relative group ">
            <div onClick={handleToggle} className="w-[35px] h-[35px] group-hover:ring-1 ring-secondary-500 select-none cursor-pointer flex justify-center items-center rounded-full bg-yellow-700 text-white">
              <span>{user?.name.charAt().toUpperCase()}</span>
            </div>
            <Logout show={show} user={user} />
            <span className="-z-50 group-hover:block hidden absolute -right-2 top-11 text-start rounded  tracking-wider scale-[90%]  w-[200px] p-2 bg-secondary-500">
              <h6 className="text-sm font-bold text-white leading-tight">Google Account</h6>
              <p className="text-xs text-slate-300 font-semibold leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-300 font-semibold leading-tight">{user?.email}</p>
            </span>            
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
