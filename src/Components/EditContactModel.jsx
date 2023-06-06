import Cookies from "js-cookie";
import Logo from "../images/contact-Logo.svg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleContactQuery,
  useUpdateContactMutation,
} from "../redux/api/contactApi";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { MdOutlinePhone } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { ThreeDots } from "react-loader-spinner";

const EditContactModel = ({ toggleModal }) => {
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

  return (
    <div
      //   onClick={toggleModal}
      className="fixed inset-0 bg-black bg-opacity-25  backdrop-blur-sm flex justify-center items-center"
    >
      <div className="w-[450px] h-[600px] bg-white border border-[#d3d4d7] rounded-lg flex flex-col justify-center items-center space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <img src={Logo} className="w-[20%]" alt="" />
          <h4 className="font-semibold text-xl">Edit Contact</h4>
        </div>

        <form onSubmit={editHandler} className="mt-4 space-y-8">
          <div className="flex items-start">
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
          <div className="flex items-start">
            <div className="w-[10%]">
              <MdOutlinePhone className="text-secondary-500 text-xl mt-6" />
            </div>
            <div className="w-[90%] flex flex-col space-y-2 mt-3">
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border-b-[1px] border-secondary-200 outline-none py-2 "
              />
            </div>
          </div>
          <div className="flex items-start">
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

          <div className="flex items-start">
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
          <div className="w-[360px] flex justify-between items-center">
            <div className="w-[360px] flex justify-between items-center select-none">
              <Link to="/">
                <p className="py-2 px-6 text-primary-100 font-semibold p-2 -ml-2 rounded hover:bg-secondary-200 duration-200 hover:text-primary-200 cursor-pointer">
                  Cancel
                </p>
              </Link>
              <button type="button" onClick={toggleModal}>
                Close
              </button>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditContactModel;
