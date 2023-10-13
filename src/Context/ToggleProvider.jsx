import { useState } from "react";
import { createContext } from "react";
import {
  addContact,
  removeContact,
} from "../redux/services/favoritContactSlice";
import { useDispatch } from "react-redux";

export const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {
  const dispatch = useDispatch();

  //random color
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
  const randomColorIndex = Math.floor(Math.random() * colors.length);
  const randomColor = colors[randomColorIndex];

  //sitebar toggler
  const [isOpen, setIsOpen] = useState(false);
  const toggleSitebar = () => {
    setIsOpen(!isOpen);
  };

  //change password modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  //confirm delete modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  //toggle favorite contact icon
  const [fav, setfav] = useState(true);
  const toggleFav = (contact) => {
    if (fav) {
      setfav(!fav);
      dispatch(addContact(contact));
    } else {
      setfav(!fav);
      dispatch(removeContact(contact));
    }
  };

  //get clicked Id
  const [id, setClickedId] = useState(null);
  const handleGetId = (id) => {
    // Set the clicked ID in the state
    setClickedId(id);
  };

  const value = {
    isOpen,
    setIsOpen,
    toggleSitebar,
    modal,
    toggleModal,
    deleteModal,
    toggleDeleteModal,
    randomColor,
    fav,
    toggleFav,
    removeContact,
    id,
    handleGetId,
  };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export default ToggleProvider;
