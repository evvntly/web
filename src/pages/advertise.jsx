import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";

const Advertise = () => {
  return (
    <>
      <Helmet>
        <title>Advertise</title>
        <link rel="canonical" href="https://eventfinda.io/advertise" />
        <meta name="description" content="Advertise with event finda" />
      </Helmet>
      <Layout>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Advertise" />
            <Paragraph>Coming Soon</Paragraph>
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default Advertise;
