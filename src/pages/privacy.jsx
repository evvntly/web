import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy</title>
        <link rel="canonical" href="https://eventfinda.io/privacy" />
        <meta name="description" content="Privacy Event Finda" />
      </Helmet>
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Privacy" />
            <Paragraph>Coming Soon</Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Privacy;
