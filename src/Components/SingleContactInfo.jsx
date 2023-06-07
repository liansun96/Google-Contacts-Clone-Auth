import React, { useEffect, useState } from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import { MdArrowBack, MdOutlinePhone } from "react-icons/md";
import { TbAddressBook, TbCameraPlus } from "react-icons/tb";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/api/contactApi";
import { BiVideo } from "react-icons/bi";

const SingleContactInfo = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data: contact } = useGetSingleContactQuery({ id, token });
  console.log(contact);

  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(contact?.contact?.name);
    setEmail(contact?.contact?.email);
    setPhone(contact?.contact?.phone);
    setAddress(contact?.contact?.address);
  }, [contact]);

  return (
    <div className="w-[100%] px-10">
      <button
        className="fixed text-xl top-7 relative group"
        onClick={() => nav(-1)}
      >
        <MdArrowBack className="text-secondary-500 text-xl" />
        <span className="hidden group-hover:block absolute top-6 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-nromal rounded scale-[50%]">
          <p>Back</p>
        </span>
      </button>

      <div className="flex justify-between">
        <div className="w-[60%] flex justify-between items-center ps-9 space-x-3 py-5  px-6">
          <div className="w-[30%]">
            <div className="w-[160px] h-[160px]  ring-secondary-500 select-none cursor-pointer flex justify-center items-center rounded-full bg-yellow-700">
              <span className="text-7xl text-white">
                {name?.charAt().toUpperCase()}
              </span>
            </div>
          </div>

          <div className="w-[70%]">
            <p className="font-normal text-dark-300  text-4xl leading-tight first-letter:capitalize">
              {name}
            </p>
          </div>
        </div>
        <div className="w-[30%] self-end">
          <Link
            to={`/editContact/${id}`}
            className="px-5 py-1 rounded text-white bg-primary-100 hover:bg-primary-200"
          >
            Edit
          </Link>
        </div>
      </div>
      <div className="w-[95%] border-b-[1px] border-secondary-200 relative mt-3">
        <div className="w-[300px] h-100px  flex justify-center items-center space-x-4 absolute left-[190px] -top-5">
          <div className="w-10 h-10 bg-white rounded-full border border-primar-100 flex justify-center items-center">
            <HiOutlineMail className="text-gray-400 text-xl" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full border border-primar-100 flex justify-center items-center">
            <IoMdCalendar className="text-gray-400 text-xl" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full border border-primar-100 flex justify-center items-center">
            <FiMessageSquare className="text-gray-400 text-xl" />
          </div>
          <div className="w-10 h-10 bg-white rounded-full border border-primar-100 flex justify-center items-center">
            <BiVideo className="text-gray-400 text-xl" />
          </div>
        </div>
      </div>

      <div className="w-[550px] border border-secondary-200 rounded-xl m-10 p-5">
        <div className="flex items-start w-[50%]">
          <h6 className="font-semibold text-lg">Contact Details</h6>
        </div>
        <div className="flex items-start space-x-3 w-[70%] mt-2">
          <div className="w-[10%]">
            <MdOutlinePhone className="text-secondary-500 text-xl mt-3" />
          </div>
          <div className="w-[90%] flex flex-col space-y-2 mt-3 text-primary-100">
            {phone}
          </div>
        </div>
        <div className="flex items-start space-x-3 w-[70%] mt-2">
          <div className="w-[10%]">
            <HiOutlineMail className="text-secondary-500 text-xl mt-3" />
          </div>
          <div className="w-[90%] flex flex-col space-y-2 mt-3 text-primary-100">
            {email}
          </div>
        </div>
        <div className="flex items-start space-x-3 w-[70%] mt-2">
          <div className="w-[10%]">
            <TbAddressBook className="text-secondary-500 text-2xl mt-3" />
          </div>
          <div className="w-[90%] flex flex-col space-y-2 mt-3 text-primary-100">
            {address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContactInfo;
