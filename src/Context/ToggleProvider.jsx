import { useState } from "react";
import { createContext } from "react";

export const ToggleContext = createContext();

const ToggleProvider = ({ children }) => {

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

  const value = {isOpen,toggleSitebar,modal,toggleModal};

  return (
    <ToggleContext.Provider value={value}>{children}</ToggleContext.Provider>
  );
};


export default ToggleProvider;