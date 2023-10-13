import React, { useContext, useEffect, useRef, useState } from "react";
import { HiOutlineMail, HiOutlineUser } from "react-icons/hi";
import { IoMdCalendar } from "react-icons/io";
import { FiMessageSquare } from "react-icons/fi";
import {
  MdArrowBack,
  MdOutlineModeEdit,
  MdOutlinePhone,
  MdOutlineStarBorder,
  MdStar,
} from "react-icons/md";
import { TbAddressBook, TbCameraPlus } from "react-icons/tb";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContactMutation,
  useGetSingleContactQuery,
} from "../redux/api/contactApi";
import { BiVideo } from "react-icons/bi";
import {
  addContact,
  removeContact,
} from "../redux/services/favoritContactSlice";
import { useDispatch, useSelector } from "react-redux";
import DeleteContactDrop from "./DeleteContactDrop";
import toast, { Toaster } from "react-hot-toast";
import { ToggleContext } from "../Context/ToggleProvider";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const SingleContactInfo = () => {
  const token = Cookies.get("token");
  const { id } = useParams();
  const { data: contact } = useGetSingleContactQuery({ id, token });
  console.log(contact);

  const { toggleDeleteModal, deleteModal } = useContext(ToggleContext);

  const [deleteContact] = useDeleteContactMutation();

  const notify = () => toast("Successfully deleted.");
  const handleDelete = () => {
    deleteContact({ id: id, token });
    toggleDeleteModal();
    notify();
  };

  const favContacts = useSelector(
    (state) => state.favoriteContactSlice.favContacts
  );

  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const showDeleteRef = useRef();
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => {
    setShowDelete(!showDelete);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!showDeleteRef.current.contains(e.target)) {
        setShowDelete(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  useEffect(() => {
    setName(contact?.contact?.name);
    setEmail(contact?.contact?.email);
    setPhone(contact?.contact?.phone);
    setAddress(contact?.contact?.address);
  }, [contact]);

  const dispatch = useDispatch();

  const isContactInList = favContacts?.find(
    (c) => c.id === contact?.contact?.id
  );
  console.log(isContactInList);

  const handleAddFav = () => {
    if (isContactInList) {
      dispatch(removeContact(contact?.contact));
    } else {
      // Movie is not in the list, dispatch addMovie action
      dispatch(addContact(contact?.contact));
    }
  };

  return (
    <div className="w-[100%] md:px-10">
      <div className="relative">
        <div className="hidden md:block">
          <button
            className="fixed flex items-center justify-center rounded-full text-xl top-[100px] left-5 md:left-[280px] group w-[40px] h-[40px] cursor-pointer hover:bg-secondary-200"
            onClick={() => nav(-1)}
          >
            <MdArrowBack className="text-secondary-500 text-xl" />
            <span className="hidden group-hover:block absolute top-10 -left-4 w-[70px] p-2 bg-secondary-500 text-white font-nromal rounded scale-[50%]">
              <p>Back</p>
            </span>
          </button>
        </div>
        <div className="block md:hidden">
          <div className="w-[90%] mx-auto flex justify-between items-center">
            <button
              className="flex items-center justify-center text-xl w-[40px] h-[40px] rounded-full hover:bg-secondary-200 group"
              onClick={() => nav(-1)}
            >
              <MdArrowBack className="text-secondary-500 text-lg" />
              <span className="hidden group-hover:block absolute top-10 -left-0 w-[70px] p-2 bg-secondary-500 text-white font-nromal rounded scale-[50%]">
                <p>Back</p>
              </span>
            </button>
            <div className="flex items-center">
              <div
                onClick={() => handleAddFav(contact)}
                className="relative group/edit"
              >
                {isContactInList ? (
                  <div className="w-10 h-10 rounded-full group-hover/edit:bg-slate-200 flex items-center justify-center">
                    <MdStar className="text-xl text-secondary-500" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full group-hover/edit:bg-slate-200 flex items-center justify-center">
                    <MdOutlineStarBorder className="text-xl text-secondary-500" />
                  </div>
                )}
                {isContactInList ? (
                  <span className="hidden group-hover/edit:block absolute top-10 -left-10 w-[120px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                    <p className="text-center">Remove star</p>
                  </span>
                ) : (
                  <span className="hidden group-hover/edit:block absolute top-10 -left-10 w-[120px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                    <p className="text-center">Star contact</p>
                  </span>
                )}
              </div>
              <div ref={showDeleteRef}>
                <button
                  onClick={handleShowDelete}
                  className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#686b70"
                    className="NSy2Hd cdByRd RTiFqe undefined"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                  </svg>
                  <DeleteContactDrop
                    id={id}
                    handleDelete={handleDelete}
                    showDelete={showDelete}
                    handleShowDelete={handleShowDelete}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link
        to={`/editContact/${id}`}
        className="md:hidden fixed bottom-16 right-10 w-[60px] h-[60px] rounded-full flex justify-center items-center custom-shadow-sm hover:custom-shaswo-lg bg-primary-100"
      >
        <MdOutlineModeEdit className="text-xl text-white" />
      </Link>

      <div className="flex justify-between items-end">
        <div className="w-full md:w-[60%] flex flex-col space-y-4 md:flex-row justify-between items-center py-5 md:ps-9 space-x-3 md:px-6">
          <div className="w-[90%] md:w-[30%]">
            <div className="w-[160px] h-[160px] mx-auto  ring-secondary-500 select-none cursor-pointer flex justify-center items-center rounded-full bg-yellow-700">
              <span className="text-7xl text-white">
                {name?.charAt().toUpperCase()}
              </span>
            </div>
          </div>

          <div className="w-[90%] md:w-[60%]">
            <p className="font-normal text-dark-300 text-center md:text-start text-4xl leading-tight first-letter:capitalize">
              {name}
            </p>
          </div>
        </div>
        <div className="w-[30%] hidden md:block mb-7">
          <div className="flex items-center gap-5">
            <div
              onClick={() => handleAddFav(contact)}
              className="relative group/edit"
            >
              {isContactInList ? (
                <div className="w-10 h-10 rounded-full group-hover/edit:bg-slate-200 flex items-center justify-center">
                  <MdStar className="text-xl text-secondary-500" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full group-hover/edit:bg-slate-200 flex items-center justify-center">
                  <MdOutlineStarBorder className="text-xl text-secondary-500" />
                </div>
              )}
              {isContactInList ? (
                <span className="hidden group-hover/edit:block absolute top-10 -left-10 w-[120px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                  <p className="text-center">Remove star</p>
                </span>
              ) : (
                <span className="hidden group-hover/edit:block absolute top-10 -left-10 w-[120px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                  <p className="text-center">Star contact</p>
                </span>
              )}
            </div>
            <div ref={showDeleteRef}>
              <button
                onClick={handleShowDelete}
                className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#686b70"
                  className="NSy2Hd cdByRd RTiFqe undefined"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
                <DeleteContactDrop
                  id={id}
                  handleDelete={handleDelete}
                  showDelete={showDelete}
                  handleShowDelete={handleShowDelete}
                />
              </button>
            </div>
            <Link
              to={`/editContact/${id}`}
              className="px-6 py-2 rounded-full font-semibold text-white bg-primary-100 hover:bg-primary-200 hover:shadow-md"
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[95%] border-b-[1px] border-secondary-200 relative mt-3">
        <div className="w-[300px] h-100px  flex justify-center items-center space-x-4 absolute left-12 -top-5 md:left-[190px] md:-top-5">
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

      <div className="w-[350px] md:w-[550px] mx-auto border border-secondary-200 rounded-xl mt-10 md:m-10 p-5">
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
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      {deleteModal && <ConfirmDeleteModal />}
    </div>
  );
};

export default SingleContactInfo;
