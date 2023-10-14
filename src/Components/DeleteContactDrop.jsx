import React, { useContext } from "react";
import { ToggleContext } from "../Context/ToggleProvider";
import { AiFillPrinter } from "react-icons/ai";

const DeleteContactDrop = ({ showDelete }) => {
  const { toggleDeleteModal, handleGetId, id } = useContext(ToggleContext);

  const handleDelete = () => {
    toggleDeleteModal();
    handleGetId(id);
  };

  const handlePrint = () => {
    window.print();
  };


  return (
    <div
      className={
        showDelete
          ? "delete-contact-drop opacity-100 text-secondary-500 p-1"
          : "delete-contact-drop opacity-0 -z-10 translate-y-3 p-1"
      }
    >
      <div className="">
        <button onClick={handlePrint} className="w-full flex justify-start items-center px-4 py-[11px] gap-2 hover:bg-secondary-300 rounded-t-xl">
          <AiFillPrinter className="text-secondary-500 text-xl" />

          <p className="font-semibold text-base">Print</p>
        </button>
        <div className="flex justify-start items-center px-4 py-[11px] gap-2 hover:bg-secondary-300">
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

          <p className="font-semibold text-base">Export</p>
        </div>
        <div className="flex justify-start items-center px-4 py-[11px] gap-2 hover:bg-secondary-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#686b70">
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.81.97H5.44l.8-.97zM5 19V8h14v11H5zm8.45-9h-2.9v3H8l4 4 4-4h-2.55z"></path>
          </svg>

          <p className="font-semibold text-base">Hide from contacts</p>
        </div>
        <button
          onClick={handleDelete}
          className="w-full flex justify-start items-center px-4 py-[11px] gap-2 hover:bg-secondary-300 rounded-b-xl"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#686b70">
            <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
            <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
          </svg>
          <p className="font-semibold text-base ps-1">Delete</p>
        </button>
      </div>
    </div>
  );
};

export default DeleteContactDrop;
