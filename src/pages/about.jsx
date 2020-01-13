import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";

const About = () => {
  const postNode = {
    title: `${config.siteTitle} | About`,
    pagePath: "/about"
  };

  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/" pageSEO />
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="About" />
            <Paragraph>Coming soon...</Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default About;
