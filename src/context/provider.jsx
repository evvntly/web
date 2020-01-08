import React, { useState } from "react";
export const myContext = React.createContext();

const Provider = props => {
  const [data, setData] = useState({});
  const [artistName, setArtistName] = useState("");
  const [user, setUser] = useState(false);
  const [signin, setSignin] = useState(false);

  const context = {
    data,
    setData,
    artistName,
    setArtistName,
    user,
    setUser,
    signin,
    setSignin
  };

  return (
    <myContext.Provider value={context}>{props.children}</myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
