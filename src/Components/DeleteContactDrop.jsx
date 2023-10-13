import React, { useContext } from "react";
import ChangePasswordModal from "./ChangePasswordModel";
import { ToggleContext } from "../Context/ToggleProvider";
import { MdDeleteOutline } from "react-icons/md";

const DeleteContactDrop = ({ showDelete, handleShowDelete ,handleDelete , id}) => {
  const { toggleDeleteModal, deleteModal } = useContext(ToggleContext);

  return (
    <div
      className={
        showDelete
          ? "delete-contact-drop opacity-100 text-secondary-500 p-1"
          : "delete-contact-drop opacity-0 -z-10 translate-y-3 p-1"
      }
    >
      <div className="">
        <div          
          className="flex justify-start items-center px-4 py-[11px] gap-2 hover:bg-secondary-300 rounded-t-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="#686b70"
              d="M11 12q-1.65 0-2.825-1.175T7 8q0-1.65 1.175-2.825T11 4q1.65 0 2.825 1.175T15 8q0 1.65-1.175 2.825T11 12Zm0-2q.825 0 1.413-.588T13 8q0-.825-.588-1.413T11 6q-.825 0-1.413.588T9 8q0 .825.588 1.413T11 10Zm4 10H5q-.825 0-1.413-.588T3 18v-.775q0-.85.425-1.575t1.175-1.1q1.275-.65 2.888-1.1T11 13q.525 0 1.025.038t1 .112q.025.575.138 1.1t.387 1.025q-.575-.125-1.213-.2T11 15q-1.8 0-3.2.438t-2.3.887q-.25.125-.375.375T5 17.225V18h10v2Zm4.7-.65l-1.05 1.2q-.15.175-.388.175t-.387-.175l-.65-.775q-.125-.125-.175-.3t-.05-.35v-3.3q-.875-.325-1.438-1.087T15 13q0-1.25.875-2.125T18 10q1.25 0 2.125.875T21 13q0 .975-.563 1.738T19 15.825V16l.65.65q.15.15.15.35t-.15.35L19 18l.675.675q.125.125.138.325t-.113.35ZM18 14.5q.625 0 1.063-.438T19.5 13q0-.625-.438-1.063T18 11.5q-.625 0-1.063.438T16.5 13q0 .625.438 1.063T18 14.5ZM11 8h-.013H11Zm0 10Z"
            ></path>
          </svg>

          <p className="font-semibold text-base">Hide from contacts</p>
        </div>
        <button onClick={toggleDeleteModal} className="w-full flex justify-start items-center px-4 py-[11px] gap-2 hover:bg-secondary-300 rounded-b-xl">
          <MdDeleteOutline className="text-xl text-secondary-500" />

          <p className="font-semibold text-base ps-1">Delete</p>
        </button>
      </div>
    </div>
  );
};

export default DeleteContactDrop;
