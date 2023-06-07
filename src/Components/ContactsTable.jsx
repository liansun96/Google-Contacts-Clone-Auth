import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineStarBorder,
  MdOutlineModeEdit,
  MdDeleteOutline,
  MdInfoOutline,
  MdStar,
} from "react-icons/md";
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

  const totalPages = data?.contacts?.total
    ? Math.ceil(data.contacts.total / 10)
    : 0;

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
            <div
              onClick={(e) => e.stopPropagation()}
              className="hidden group-hover/item:block"
            >
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
              <span className="">{contact.name.charAt().toUpperCase()}</span>
            </div>
            <p className="group-hover/item:ms-[17px]">{contact.name}</p>
          </td>
          <td className="">{contact.email}</td>
          <td className="">{contact.phone}</td>
          <td className="flex justify-between">
            <span>
              {contact?.address?.length > 25
                ? `${contact?.address.substring(0, 25)} . . .`
                : contact?.address}

                ? `${contact?.address?.substring(0, 25)} . . .`
                : contact?.address}
              {/* {contact.address} */}
            </span>
            <div
              onClick={(e) => e.stopPropagation()}
              className="hidden group-hover/item:block"
            >
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
    <div className="w-[90%] p-x5">
      <div>
        <table className="w-full">
          <thead className="">
            <tr className="border-b-[1px] border-secondary-200 text-sm font-light text-slate-500">
              <th className="text-start font-semibold w-[23%] py-4">Name</th>
              <th className="text-start font-semibold w-[23%]">Email</th>
              <th className="text-start font-semibold w-[14%]">Phone number</th>
              <th className="text-start font-semibold w-[40%]">Address</th>
            </tr>
          </thead>

          <p className="text-[10px] text-slate-500 font-bold tracking-widest py-2">
            CONTACTS ({data?.contacts?.total})
          </p>

          <tbody>{row}</tbody>
        </table>
        <div className="w-[50%] mx-auto flex justify-center ms-16 space-x-4 fixed bottom-0 items-center my-6 mt-auto">
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
                    ? "bg-primary-100 text-white w-6 h-6 flex justify-center items-center rounded-full"
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
        </div>
      </div>
    </div>
  );
};

export default ContactTable;
