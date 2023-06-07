import React, { useState } from "react";
// import Nav from "./Components/Nav";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ContactsTable from "./Components/ContactsTable";
import CreateContact from "./Components/CreateContact";
import Guard from "./Components/Guard";
import SingleContactInfo from "./Components/SingleContactInfo";
import EditContact from "./Components/EditContact";
import ChangePasswordModal from "./Components/ChangePasswordModel";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Frequently from "./Components/Frequently";
import Favorite from "./Components/Favorite";
import FavoriteCon from "./Components/FavoriteCon";


const App = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Guard>
              <Dashboard />
            </Guard>
          }
        >
          <Route index element={<ContactsTable />} />
          <Route path="contactsTable" element={<ContactsTable />} />
          <Route path="createContact" element={<CreateContact />} />
          <Route path="frequently" element={<Frequently />} />
          <Route path="favoriteCon" element={<FavoriteCon />} />
          <Route path="editContact/:id" element={<EditContact />} />
          <Route path="changePasswordModal" element={<ChangePasswordModal />} />
          <Route path="singleContactInfo/:id" element={<SingleContactInfo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </div>
  );
};

export default App;
