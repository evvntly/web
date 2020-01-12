import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import config from "../../../mindacademy/src/utils/siteConfig";

const Index = () => {
  const postNode = {
    title: config.siteTitle
  };

  return (
    <>
      <Helmet>
        <title>{config.siteTitle}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/" customTitle />
      <Layout />
    </>
  );
};

export default Index;
