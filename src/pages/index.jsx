import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout/layout";
import Seo from "../components/seo/seo";
import config from "../utils/siteConfig";

const Index = () => {
  const postNode = {
    title: `${config.siteTitle} | Events in San Francisco, LA, New York and all around the USA. Find events near you`,
    pagePath: "/"
  };

  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/" pageSEO />
      <Layout />
    </>
  );
};

export default Index;
