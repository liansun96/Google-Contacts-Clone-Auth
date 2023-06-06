import React, { useState } from "react";
import Nav from "./Components/Nav";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ContactsTable from "./Components/ContactsTable";
import CreateContact from "./Components/CreateContact";
import Guard from "./Components/Guard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EditContactModel from "./Components/EditContactModel";
import SingleContactInfo from "./Components/SingleContactInfo";
import EditContact from "./Components/EditContact";

const App = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSitebar = () => {
    setIsOpen(!isOpen);
  };

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Guard>
              <Dashboard toggleSitebar={toggleSitebar} isOpen={isOpen} />
            </Guard>
          }
        >
          <Route index element={<ContactsTable />} />
          <Route path="contactsTable" element={<ContactsTable />} />
          <Route path="createContact" element={<CreateContact />} />
          <Route path="editContact/:id" element={<EditContact />} />
          <Route path="singleContactInfo/:id" toggleModal={toggleModal} modal={modal} element={<SingleContactInfo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
