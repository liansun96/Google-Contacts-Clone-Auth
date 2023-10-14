import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToggleContext } from "../Context/ToggleProvider";
import {
  useDeleteContactMutation,
  useGetContactQuery,
} from "../redux/api/contactApi";
import toast, { Toaster } from "react-hot-toast";

const ConfirmDeleteModal = () => {
  const token = Cookies.get("token");

  const { toggleDeleteModal, deleteModal, id } = useContext(ToggleContext);
  const { data } = useGetContactQuery(token);
  const [deleteContact] = useDeleteContactMutation();
  console.log(id);

  const nav = useNavigate();

  const notify = () => toast("Successfully deleted.");
  const handleDelete = () => {
    deleteContact({ id: id, token });
    toggleDeleteModal();
    notify();
    nav("/");
  };

  return (
    <div
      onClick={toggleDeleteModal}
      className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center  z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] md:w-[550px] h-[200px] bg-white border border-[#d3d4d7] rounded-lg p-5 flex flex-col justify-center items-start space-y-4"
      >
        <h6 className="text-lg font-semibold text-start text-gray-800">
          Delete from contacts?
        </h6>
        <div className="flex justify-center items-center space-x-5">
          <p className="font-medium text-gray-600">
            This contact will be permanently deleted from this account after 30
            days.
          </p>
        </div>
        <div className="w-full flex justify-end items-end">
          <button
            className="px-3 py-1 font-bold text-primary-200"
            onClick={toggleDeleteModal}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 font-bold text-primary-200"
            onClick={handleDelete}
          >
            Delete
          </button>
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
    </div>
  );
};

export default ConfirmDeleteModal;
