import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  contacts :[],
  searchContact : ''
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addContacts : (state, {payload}) => {
        state.contacts = payload
    },
    setSearchContact : (state , {payload}) => {
        state.searchContact = payload
    }
  },
});

export const { addContacts ,setSearchContact } = contactSlice.actions;
export default contactSlice.reducer;
