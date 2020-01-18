/* eslint-disable */
import React, { useState, useEffect } from "react";
import FullStory from "react-fullstory";
import { ipCheck } from "../startup/ipcheck";
import ErrorBoundary from "../components/error-boundry/error-boundry";
import moment from "moment";
export const myContext = React.createContext();

const Provider = props => {
  const [data, setData] = useState({});
  const [searchTerm, setsearchTerm] = useState("");
  const [user, setUser] = useState(false);
  const [error, setError] = useState(false);
  const [signin, setSignin] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [ipLocation, setIplocation] = useState("US");
  const [radius, setRadius] = useState(25);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showHamburger, setShowHamburger] = useState(false);
  const [location, setLocation] = useState(false);
  const [eventData, setEventData] = useState(false);
  const [emailInUse, setEmailInUse] = useState(false);
  const [userLoading, SetUserLoading] = useState(true);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [forceSearch, setForceSearch] = useState(false);
  const [startDate, setStartDate] = useState(false);

  useEffect(() => {
    ipCheck(setIplocation);
  }, []);

  const withinUs = ipLocation === "US";

  const convertDate =
    startDate &&
    moment(startDate)
      .format("L")
      .replace(/\//g, "-");

  const context = {
    data,
    setData,
    searchTerm,
    setsearchTerm,
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
    setShowHamburger,
    location,
    setLocation,
    eventData,
    setEventData,
    emailInUse,
    setEmailInUse,
    userLoading,
    SetUserLoading,
    isAuthPage,
    setIsAuthPage,
    forceSearch,
    setForceSearch,
    startDate,
    setStartDate,
    convertDate
  };

  return (
    <myContext.Provider value={context}>{props.children}</myContext.Provider>
  );
};

export default ({ element }) => (
  <ErrorBoundary>
    <FullStory org={process.env.GATSBY_FULLSTORY_ORG_ID} />
    <Provider>{element}</Provider>
  </ErrorBoundary>
);
