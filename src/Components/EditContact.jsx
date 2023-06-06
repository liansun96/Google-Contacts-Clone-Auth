import React, { useEffect, useRef, useState } from "react";
import userProfile from "../images/user-profile.png";
import { TbAddressBook, TbCameraPlus } from "react-icons/tb";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { MdArrowBack, MdOutlinePhone } from "react-icons/md";
import Cookies from "js-cookie";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data: contact } = useGetSingleContactQuery({ id, token });
  console.log(contact);
  const [updateContact, { isLoading, error, isError }] =
    useUpdateContactMutation({ id, token });

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

  const editHandler = async (e) => {
    e.preventDefault();
    const newContact = { id, name, email, phone, address };
    const { data } = await updateContact({ token, newContact });
    console.log(data);
    if (data?.success) nav("/");
  };

  const inputRef = useRef(null);

  useEffect(() => {
    // When the component mounts, focus the input element
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={editHandler} className="w-[100%] px-10">
      <button
        className="fixed text-xl top-7 relative group"
        onClick={() => nav("/")}
      >
        <RxCross2 className="text-secondary-500 text-xl" />
        <span className="hidden group-hover:block absolute top-6 -left-8 w-[85px] p-2 bg-secondary-500 text-white font-nromal rounded scale-[50%]">
          <p>Cancel</p>
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
          <button
            type="submit"
            className="px-5 py-1 rounded text-white bg-primary-100 hover:bg-primary-200"
          >
            Edit
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
            ref={inputRef}
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

export default EditContact;
