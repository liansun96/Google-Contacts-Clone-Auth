import React, { useContext, useState } from "react";
import { HiOutlineUser, HiPlus } from "react-icons/hi";
import {
  MdHistory,
  MdOutlineKeyboardArrowUp,
  MdOutlineStarBorder,
} from "react-icons/md";
import { TfiTrash } from "react-icons/tfi";
import { Link, NavLink, Outlet } from "react-router-dom";
import Nav from "./Nav";
import Cookies from "js-cookie";
import { useGetContactQuery } from "../redux/api/contactApi";
import { ToggleContext } from "../Context/ToggleProvider";
import { AiFillPrinter } from "react-icons/ai";

const Dashboard = () => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery({ token });
  console.log(data);

  const { isOpen } = useContext(ToggleContext);
  return (
    <>
      <Nav />
      <div className="flex mt-3">
        <div
          className={`${
            isOpen ? "w-[350px] block" : "w-[0px]  -translate-x-[500px]"
          } transform duration-700`}
        >
          <div className="w-[90%]">
            <Link to="createContact">
              <button className="group flex items-center space-x-4 py-2 px-4 rounded-[40px] duration-300 cus-shadow-sm hover:cus-shadow-lg hover:duration-200">
                <div className="">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <path fill="#34A853" d="M16 16v14h4V20z"></path>
                    <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                    <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                    <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                </div>
                <h6 className="duration-300 group-hover:text-primary-200">
                  Create contact
                </h6>
              </button>
            </Link>
            <ul className="my-2 mt-6">
              <li>
                <NavLink
                  exact
                  to="contactsTable"
                  className="flex justify-between items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300  rounded-tr-[40px] rounded-br-[40px]"
                >
                  <div className="flex items-center space-x-6">
                    <HiOutlineUser className="text-xl" />
                    <p className="font-semibold text-sm">Contacts</p>
                  </div>
                  <span className="font-semibold text-sm">
                    {data?.contacts.total}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="favoriteCon"
                  className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                >
                  {/* <RiUser3Line className='text-xl'/> */}
                  <MdOutlineStarBorder className="text-xl " />
                  <p className="font-semibold text-sm">Favorite</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="frequently"
                  className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                >
                  <MdHistory className=" text-xl" />
                  <p className="font-semibold text-sm">Frequently</p>
                </NavLink>
              </li>
            </ul>
            <div className="border-b-[1px] border-secondary-200"></div>
            <ul className="my-2">
              <li>
                <div className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]">
                  <MdOutlineKeyboardArrowUp className="text-secondary-500 text-xl" />
                  <p className="font-semibold text-sm">Labels</p>
                </div>
              </li>
              <li>
                <div className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]">
                  <HiPlus className="text-secondary-500 text-xl" />
                  <p className="font-semibold text-sm">Create label</p>
                </div>
              </li>
            </ul>
            
            <div className="border-b-[1px] border-secondary-200"></div>
            <ul className="my-2">
              <li>
                <div className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="NSy2Hd cdByRd RTiFqe null"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                      fill="#686b70"
                      d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z"
                    ></path>
                  </svg>
                  <p className="font-semibold text-sm">Other contacts</p>
                </div>
              </li>
              <li>
                <div className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]">
                  <TfiTrash className="text-secondary-500 text-xl" />
                  <p className="font-semibold text-sm">Trash</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
