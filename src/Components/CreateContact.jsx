import React, { useState } from "react";
import userProfile from "../images/user-profile.png";
import { TbAddressBook, TbCameraPlus } from "react-icons/tb";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { MdOutlinePhone } from "react-icons/md";
import Cookies from "js-cookie";
import { useCreateContactMutation } from "../redux/api/contactApi";
import { useNavigate } from "react-router-dom";

const CreateContact = () => {
  const token = Cookies.get("token");
  const [createContact, { isLoading, isError, error }] =
    useCreateContactMutation(token);
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const contact = { name, email, phone, address };
    const { data } = await createContact({ token, contact });
    console.log(data);
    if (data?.success) nav("/");
    console.log(isError);
  };

  return (
    <form onSubmit={handleCreate} className="w-[100%] px-10">
      <div className="flex justify-between">
        <div className="w-[20%] relative">
          <img src={userProfile} className="rounded-full w-[200px]" alt="" />
          <span className="absolute top-[75px] left-[75px] flex justify-center items-center w-[50px] h-[50px] rounded-full text-white bg-black bg-opacity-40">
            <TbCameraPlus className="text-[30px]" />
          </span>
        </div>
        <div className="w-[30%] self-end">
          <button
            type="submit"
            className="px-5 py-1 rounded text-white bg-primary-100 hover:bg-primary-200"
          >
            Save
          </button>
        </div>
      </div>
      <div className="w-[95%] border-b-[1px] border-secondary-200 mt-3"></div>
      <div className="flex items-start w-[50%] mt-2">
        <div className="w-[10%]">
          <HiOutlineUser className="text-secondary-500 text-xl mt-6" />
        </div>
        <div className="w-[90%] flex flex-col space-y-2 mt-3">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-b-[1px] border-secondary-200 outline-none py-2 "
          />
        </div>
      </div>
      <div className="flex items-start w-[50%] mt-2">
        <div className="w-[10%]">
          <MdOutlinePhone className="text-secondary-500 text-xl mt-6" />
        </div>
        <div className="w-[90%] flex flex-col space-y-2 mt-3">
          <input
            type="number"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-b-[1px] border-secondary-200 outline-none py-2 "
          />
        </div>
      </div>
      <div className="flex items-start w-[50%] mt-2">
        <div className="w-[10%]">
          <HiOutlineMail className="text-secondary-500 text-xl mt-6" />
        </div>
        <div className="w-[90%] flex flex-col space-y-2 mt-3">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-[1px] border-secondary-200 outline-none py-2 "
          />
        </div>
      </div>
      <div className="flex items-start w-[50%] mt-2">
        <div className="w-[10%]">
          <TbAddressBook className="text-secondary-500 text-2xl mt-6" />
        </div>
        <div className="w-[90%] flex flex-col space-y-2 mt-3">
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-b-[1px] border-secondary-200 outline-none py-2 "
          />
        </div>
      </div>
    </form>
  );
};

export default CreateContact;
