import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";

const Success = () => {
  const postNode = {
    title: `${config.siteTitle} | Success`,
    pagePath: "/success"
  };
  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/advertise" pageSEO />
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Thank You" />
            <Paragraph>
              Thanks for reaching out, we will be in touch soon.
            </Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Success;
