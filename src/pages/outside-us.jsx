import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import Paragraph from "../library/paragraph/paragraph";

const Privacy = () => {
  const postNode = {
    title: `${config.siteTitle} | Outside USA Notice`,
    pagePath: "/outside-us"
  };
  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/outside-us" pageSEO />
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Browsing outside the US?" />
            <Paragraph>Welcome international user!</Paragraph>
            <Paragraph>
              We are sorry that our results may be limited outside the USA at
              this time, we only just launched the product and the API we are
              currently using has very limited results outside the US.
            </Paragraph>
            <Paragraph>
              We do plan on adding more functionality for international users,
              and collecting data from a few different API&apos;s. However we
              don&apos;t have a ETA on this yet as this is not a trivial change.
            </Paragraph>
            <Paragraph>
              Thanks for your patience, we will make an announcement once we
              have added this functionality.
            </Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Privacy;
