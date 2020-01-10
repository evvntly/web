import React from "react";
import { Helmet } from "react-helmet";
import LayoutHome from "../components/layout/layout-home";

export default () => {
  return (
    <>
      <Helmet>
        <title>
          Event Finda - Search the USA for events to do today, or next week
        </title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Looking for events in San Francisco, New York, La? Look no further, find events all across the USA."
        />
      </Helmet>
      <LayoutHome />
    </>
  );
};
