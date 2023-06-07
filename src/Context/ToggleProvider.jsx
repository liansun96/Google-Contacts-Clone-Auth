import { useState } from "react";
import { createContext } from "react";
import { addContact, removeContact } from "../redux/services/favoritContactSlice";
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
  const [isOpen, setIsOpen] = useState(true);
  const toggleSitebar = () => {
    setIsOpen(!isOpen);
  };

  //change password modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };


  //toggle favorite contact icon
  const [fav,setfav] = useState(true)  
  const toggleFav = (contact) => {
    if (fav) {
      setfav(!fav);
      dispatch(addContact(contact));
    } else {
      setfav(!fav);
      dispatch(removeContact(contact));
    }
  };

  const value = { isOpen, toggleSitebar, modal, toggleModal ,randomColor ,fav ,toggleFav };

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};

export default ToggleProvider;
