import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";

const Contact = () => {
  const postNode = {
    title: `${config.siteTitle} | Contact`,
    pagePath: "/contact"
  };
  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/contact" pageSEO />
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Contact" />
            <Paragraph>Coming Soon</Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Contact;
