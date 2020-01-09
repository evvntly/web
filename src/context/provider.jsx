import React, { useState, useEffect } from "react";
import { ipCheck } from "../startup/ipcheck";
export const myContext = React.createContext();

const Provider = props => {
  const [data, setData] = useState({});
  const [artistName, setArtistName] = useState("");
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  const [signin, setSignin] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [ipLocation, setIplocation] = useState("US");
  const [radius, setRadius] = useState(50);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showHamburger, setShowHamburger] = useState(false);

  useEffect(() => {
    ipCheck(setIplocation);
  }, []);

  const withinUs = ipLocation === "US";

  const context = {
    data,
    setData,
    artistName,
    setArtistName,
    user,
    setUser,
    signin,
    setSignin,
    error,
    setError,
    userMenu,
    setUserMenu,
    withinUs,
    radius,
    setRadius,
    itemsPerPage,
    setItemsPerPage,
    showHamburger,
    setShowHamburger
  };

  return (
    <myContext.Provider value={context}>{props.children}</myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
