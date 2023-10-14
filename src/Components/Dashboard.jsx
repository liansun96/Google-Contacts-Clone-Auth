import React, { useContext, useEffect, useState } from "react";
import ContactLogo from "../images/contact-logo.svg";
import { HiOutlineUser, HiPlus } from "react-icons/hi";
import {
  MdHistory,
  MdOutlineKeyboardArrowUp,
  MdOutlineStarBorder,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import Nav from "./Nav";
import Cookies from "js-cookie";
import { useGetContactQuery } from "../redux/api/contactApi";
import { ToggleContext } from "../Context/ToggleProvider";
import "./Dashboard.css";
import { TailSpin } from "react-loader-spinner";
import { BiMenu } from "react-icons/bi";

const Dashboard = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetContactQuery({ token });
  console.log(data);

  const { isOpen, toggleSitebar } = useContext(ToggleContext);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <TailSpin
            height="80"
            width="80"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            color="#9173e9"
          />
        </div>
      ) : (
        <div>
          <>
            <Nav />
            <Link to="createContact">
              <button className="fixed bottom-16 right-10 md:hidden group flex items-center space-x-4 py-3 px-3 rounded-full duration-300 cus-shadow-sm hover:cus-shadow-lg hover:duration-200">
                <div className="">
                  <svg width="36" height="36" viewBox="0 0 36 36">
                    <path fill="#34A853" d="M16 16v14h4V20z"></path>
                    <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
                    <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
                    <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
                    <path fill="none" d="M0 0h36v36H0z"></path>
                  </svg>
                </div>
              </button>
            </Link>
            <div className="flex mt-3">
              <div
                className={`${
                  isOpen
                    ? "w-[0px] mobile-nav  -translate-x-[500px]"
                    : "w-[70%] cus-shadow-lg md:shadow-none md:w-[330px] block mobile-nav"
                } transform duration-700 `}
              >
                <div className="w-[90%] relative">
                  <Link to="createContact">
                    <div className="hidden md:block">
                      <button className="group  flex items-center space-x-4 py-2 px-4 rounded-[40px] duration-300 cus-shadow-sm hover:cus-shadow-lg hover:duration-200">
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
                    </div>
                  </Link>

                  <div className="flex justify-between items-center ms-4  mt-4 blcok md:hidden">
                    <div className="flex items-center">
                      <button
                        onClick={toggleSitebar}
                        className="w-[50px] h-[50px] flex justify-center items-center rounded-full hover:bg-secondary-200"
                      >
                        <BiMenu className="text-secondary-500 text-2xl" />
                      </button>
                      <img src={ContactLogo} className="w-[40px] " alt="" />
                    </div>
                    <p className="text-secondary-500 font-semibold text-2xl me-10">
                      Contacts
                    </p>
                  </div>
                  <ul className="my-2 mt-6">
                    <li>
                      <NavLink
                        // onClick={()=>setIsOpen(true)}
                        exact
                        to="/"
                        className="w-[260px] md:w-[250px] flex justify-between items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300  rounded-tr-[40px] rounded-br-[40px]"
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
                        className="w-[260px] md:w-[250px] flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                      >
                        {/* <RiUser3Line className='text-xl'/> */}
                        <MdOutlineStarBorder className="text-xl " />
                        <p className="font-semibold text-sm">Favorite</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="frequently"
                        className="w-[260px] md:w-[250px] flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                      >
                        <MdHistory className=" text-xl" />
                        <p className="font-semibold text-sm">Frequently</p>
                      </NavLink>
                    </li>
                  </ul>
                  <div className="border-b-[1px] border-secondary-200"></div>
                  <ul className="my-2">
                    <li>
                      <NavLink
                        to="labels"
                        className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                      >
                        <MdOutlineKeyboardArrowUp className="text-secondary-500 text-xl" />
                        <p className="font-semibold text-sm">Labels</p>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                        to="createLabels"
                      >
                        <HiPlus className="text-secondary-500 text-xl" />
                        <p className="font-semibold text-sm">Create label</p>
                      </NavLink>
                    </li>
                  </ul>

                  <div className="border-b-[1px] border-secondary-200"></div>
                  <ul className="my-2">
                    <li>
                      <NavLink
                        className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                        to="otherContacts"
                      >
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
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="flex justify-start items-center px-6 py-[11px] text-[#686b70] space-x-6 hover:bg-secondary-300 rounded-tr-[40px] rounded-br-[40px]"
                        to="trash"
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="#686b70"
                        >
                          <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                          <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                        </svg>
                        <p className="font-semibold text-sm">Trash</p>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full">
                <Outlet />
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
