import React from "react";
import { createContext, useState, useContext } from "react";

/*const logoutUser = () => {
  const [currentUser, setCurrentUser] = useState({});
};
const loginUser = () => {
  const [currentUser, setCurrentUser] = (user);
};*/

const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user")));

  const handleUpdateUser = (user) => {
    setCurrentUser(user);
    window.localStorage.setItem("user", JSON.stringify(user));
  };

  return <UserContext.Provider value={{ currentUser, handleUpdateUser }}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => {
  return useContext(UserContext);
};
