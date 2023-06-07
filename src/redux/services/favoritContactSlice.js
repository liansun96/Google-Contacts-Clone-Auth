import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  favContacts: [],
  searchFavContact : ''
};

const STORAGE_KEY = "favContacts";

const storedItems = Cookies.get(STORAGE_KEY);

if (storedItems) {
  initialState.favContacts = JSON.parse(storedItems);  
}


export const favoriteContactSlice = createSlice({
  name: "favoriteContact",
  initialState,
  reducers: {
    addContact: (state, { payload }) => {
      const isExisted = state.favContacts.find((item) => item.id === payload.id);
      if (isExisted) {
        return state;
      } else {
        state.favContacts = [...state.favContacts, { ...payload}];
      }
      
      Cookies.set(STORAGE_KEY, JSON.stringify(state.favContacts));
    },
    removeContact: (state, { payload }) => {
      state.favContacts = state.favContacts.filter((item) => item.id !== payload.id);
      
    },
    clearContact: (state) => {
      state.favContacts = [];
      return state;
    },
    addFavoriteContacts : (state, {payload}) => {
        state.contacts = payload
    },
    setSearchFavoriteContact : (state , {payload}) => {
        state.searchFavContact = payload
    }
  },
});

export const { addContact, removeContact, clearContact ,addFavoriteContacts ,setSearchFavoriteContact } =
  favoriteContactSlice.actions;

export default favoriteContactSlice.reducer;
