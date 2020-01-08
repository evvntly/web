import React, { useState } from "react";
export const myContext = React.createContext();

const Provider = props => {
  const [data, setData] = useState({});
  const [artistName, setArtistName] = useState("");
  const [user, setUser] = React.useState();

  const context = {
    data,
    setData,
    artistName,
    setArtistName,
    user,
    setUser
  };

  return (
    <myContext.Provider value={context}>{props.children}</myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
