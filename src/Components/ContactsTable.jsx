import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineStarBorder,
  MdOutlineModeEdit,
  MdDeleteOutline,
  MdInfoOutline,
  MdStar,
} from "react-icons/md";
import { AiFillPrinter } from "react-icons/ai";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts, setSearchContact } from "../redux/services/contactSlice";
import {
  addContact,
  removeContact,
} from "../redux/services/favoritContactSlice";
import { ToggleContext } from "../Context/ToggleProvider";

const ContactTable = () => {
  const token = Cookies.get("token");
  const [num, setNum] = useState(1);
  const navigate = useNavigate();

  const { data } = useGetContactQuery({ token, num });
  const [deleteContact] = useDeleteContactMutation();
  console.log(data);
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contactSlice.contacts);
  const searchContact = useSelector(
    (state) => state.contactSlice.searchContact
  );
  console.log(contacts);

  const { fav, toggleFav } = useContext(ToggleContext);

  const colors = [
    "#845EC2",
    "#D65DB1",
    "#FF6F91",
    "#FF9671",
    "#FFC75F",
    "#F9F871",
    "#C34A36",
    "#008B74",
  ];

  useEffect(() => {
    dispatch(addContacts(data?.contacts?.data));
  }, [data]);

  const selectPageHandler = (i) => {
    setNum(i);
  };

  // Total number of pages
  const totalPages = data?.contacts?.total
    ? Math.ceil(data.contacts.total / 10)
    : 0;

  const per_page = data?.contacts?.per_page; // Number of page numbers to display per page
  const current_page = data?.contacts?.current_page; // Current page number

  const startPage = Math.max(1, current_page - Math.floor(per_page / 2));
  const endPage = Math.min(totalPages, startPage + per_page - 1);

  const row = contacts
    ?.filter((item) => {
      if (searchContact === "") {
        return item;
      } else if (
        item.name.toLowerCase().includes(searchContact?.toLocaleLowerCase())
      ) {
        return item;
      }
    })
    .map((contact) => {
      const randomColorIndex = Math.floor(Math.random() * colors.length);
      const randomColor = colors[randomColorIndex];
      const handleClick = () => {
        navigate(`/singleContactInfo/${contact?.id}`);
      };
      return (
        <tr
          onClick={handleClick}
          key={contact?.id}
          className="w-full group/item duration-200 hover:bg-secondary-300 py-3 px-1 p-4 cursor-pointer !mb"
        >
          <td className="flex  justify-start items-center space-x-4 px-3 py-3 h-[55px]">
            <div onClick={(e) => e.stopPropagation()} className="hidden group-hover/item:block">
              <span className="flex space-x-2 items-center ml-[15px]">
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  className="NSy2Hd cdByRd RTiFqe undefined"
                >
                  <path fill="none" d="M0 0h24v24H0V0z"></path>
                  <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                </svg>
                <input type="checkbox" />
              </span>
            </div>
            <div
              style={{ backgroundColor: randomColor }}
              className="block group-hover/item:hidden w-[40px] h-[40px] text-white text-2xl rounded-full flex justify-center items-center"
            >
              <span className="">{contact?.name?.charAt().toUpperCase()}</span>
            </div>
            <p className="group-hover/item:ms-[17px]">
              {contact?.name?.length > 15
                ? `${contact?.name?.substring(0, 15)} . . .`
                : contact?.name}
            </p>
          </td>
          <td className="">{contact?.email}</td>
          <td className="">{contact?.phone}</td>
          <td className="">
            <span>
              {contact?.address?.length > 25
                ? `${contact?.address?.substring(0, 25)} . . .`
                : contact?.address}
              {/* {contact.address} */}
            </span>
          </td>
          <td  onClick={(e) => e.stopPropagation()}>
            <div  className="hidden group-hover/item:block">
              <div className="flex items-center space-x-5 duration-400 mr-[15px]">
                <div
                  onClick={() => toggleFav(contact)}
                  className="relative group/edit"
                >
                  {fav ? (
                    <MdOutlineStarBorder className="text-xl text-secondary-500" />
                  ) : (
                    <MdStar className="text-xl text-secondary-500" />
                  )}
                  <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                    <p className="text-center">Star</p>
                  </span>
                </div>
                <Link to={`/singleContactInfo/${contact?.id}`}>
                  <div className="relative group/edit">
                    <MdInfoOutline className="text-xl text-secondary-500" />
                    <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                      <p className="text-center">Info</p>
                    </span>
                  </div>
                </Link>
                <Link to={`/editContact/${contact?.id}`}>
                  <div className="relative group/edit">
                    <MdOutlineModeEdit className="text-xl text-secondary-500" />
                    <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                      <p className="text-center">Edit</p>
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => deleteContact({ id: contact?.id, token })}
                  className="relative group/edit"
                >
                  <MdDeleteOutline className="text-xl text-secondary-500" />
                  <span className="hidden group-hover/edit:block absolute top-5 -left-6 w-[70px] p-2 bg-secondary-500 text-white font-bold rounded scale-[60%]">
                    <p className="text-center">Delete</p>
                  </span>
                </button>
              </div>
            </div>
          </td>
        </tr>
      );
    });

  return (
    <div className="w-[95%] p-x5">
      <div>
        <table className="w-full">
          <thead className="px-3">
            <tr className="border-b-[1px] border-secondary-200 text-sm font-light text-slate-500">
              <th className="text-start font-semibold w-[25%] py-4">Name</th>
              <th className="text-start font-semibold w-[23%]">Email</th>
              <th className="text-start font-semibold w-[17%]">Phone number</th>
              <th className="text-start font-semibold w-[20%]">Address</th>
              <th className="w-[15%]">
                <div className="flex items-center space-x-5">
                  <AiFillPrinter className="text-secondary-500 text-xl" />
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="NSy2Hd cdByRd RTiFqe undefined"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path
                      fill="#686b70"
                      d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4 4-4h-2.55z"
                    ></path>
                  </svg>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    className="NSy2Hd cdByRd RTiFqe undefined"
                  >
                    <path
                      fill="#686b70"
                      d="M4 15h2v3h12v-3h2v3c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2m4.41-7.59L11 7.83V16h2V7.83l2.59 2.59L17 9l-5-5-5 5 1.41 1.41z"
                    ></path>
                  </svg>

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
                </div>
              </th>
            </tr>
          </thead>

          <p className="text-[10px] text-slate-500 font-bold tracking-widest py-2">
            CONTACTS ({data?.contacts?.total})
          </p>

          <tbody>{row}</tbody>
        </table>
        {/* <div className="w-[50%] mx-auto flex justify-center ms-16 space-x-4 fixed bottom-0 items-center my-6 mt-auto">
          <button
            onClick={() => selectPageHandler(num - 1)}
            className={num > 1 ? "" : "hidden"}
          >
            <CiCircleChevLeft className="text-2xl" />
          </button>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={`${
                  num === i + 1
                    ? "bg-primary-100 text-white px-2 py-1 flex justify-center items-center rounded-full"
                    : ""
                } cursor-pointer`}
                onClick={() => selectPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <button
            onClick={() => selectPageHandler(num + 1)}
            className={num < totalPages ? "" : "hidden"}
          >
            <CiCircleChevRight className="text-2xl" />
          </button>
        </div> */}
        <div className="w-[50%] mx-auto flex justify-center ms-16 space-x-4 fixed bottom-0 items-center my-6 mt-auto">
          <button
            onClick={() => selectPageHandler(current_page - 1)}
            className={current_page > 1 ? "" : "hidden"}
          >
            <CiCircleChevLeft className="text-2xl" />
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const pageNumber = startPage + i;
            return (
              <span
                className={`${
                  pageNumber === current_page
                    ? "bg-primary-100 text-white w-6 h-6 flex justify-center items-center rounded-full"
                    : ""
                } cursor-pointer`}
                onClick={() => selectPageHandler(pageNumber)}
                key={pageNumber}
              >
                {pageNumber}
              </span>
            );
          })}
          <button
            onClick={() => selectPageHandler(current_page + 1)}
            className={current_page < totalPages ? "" : "hidden"}
          >
            <CiCircleChevRight className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
