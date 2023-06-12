import React from "react";
import { HiOutlineUser } from "react-icons/hi";
import { MdSaveAlt } from "react-icons/md";
import { Link } from "react-router-dom";
const FavEmpty = () => {
  return (
    <div className="flex">
      <div className="flex flex-col justify-center items-center gap-5 h-[80vh] w-full md:w-[80%]">
        <div className="animate__animated animate__fadeInLeft">
          <img
            className="h-[200px]"
            src="https://ssl.gstatic.com/social/contactsui/images/emptycontacts/emptycontacts_animation_cell4.png"
            alt=""
            data-iml="221705438.80000007"
          />
        </div>
        <div>
          <h1>No favourite contacts yet</h1>
        </div>
        <div className="flex justify-center items-center gap-14 animate__animated animate__fadeInRight">
          <Link to={"/"}>
            <div className="flex items-center gap-2 hover:text-blue-500">
              <HiOutlineUser className="text-xl" />
              <p className="font-semibold text-sm">Add favourite contact</p>
            </div>
          </Link>
          {/* <MdSaveAlt/> */}
          <div className="flex items-center gap-2 hover:text-blue-500">
            <MdSaveAlt className="text-xl" />
            <p className="font-semibold text-sm">Add favourite contacts</p>
          </div>
        </div>
      </div>
      <div className="w-[0%] md:w-[15%] sm:hidden"></div>
    </div>
  );
};
export default FavEmpty;