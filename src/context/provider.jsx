import React, { useState, useEffect } from "react";
import FullStory, { identify } from "react-fullstory";
import { ipCheck } from "../startup/ipcheck";
import ErrorBoundary from "../components/error-boundry/error-boundry";
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
  const [itemsPerPage, setItemsPerPage] = useState(27);
  const [showHamburger, setShowHamburger] = useState(false);
  const [location, setLocation] = useState(false);
  const [eventData, setEventData] = useState(false);

  useEffect(() => {
    if (user) {
      identify(user.uid, {
        displayName: user.displayName,
        email: user.email
      });
    }
  }, [user]);

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
    setShowHamburger,
    location,
    setLocation,
    eventData,
    setEventData
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
