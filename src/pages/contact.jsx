import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact</title>
        <link rel="canonical" href="https://eventfinda.io/contact" />
        <meta name="description" content="Contact Event Finda" />
      </Helmet>
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
