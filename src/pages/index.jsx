import React from "react";
import { Helmet } from "react-helmet";
import LayoutHome from "../components/layout/layout-home";

export default () => {
  return (
    <>
      <Helmet>
        <title>Concert Buddy</title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Going to a concert or gig solo? Want a buddy to go with? Then you've come to the right place!"
        />
      </Helmet>
      <LayoutHome />
    </>
  );
};
