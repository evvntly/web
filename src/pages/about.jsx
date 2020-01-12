import React from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { Container, Main } from "../styles/shared";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
        <link rel="canonical" href="https://eventfinda.io/about" />
        <meta name="description" content="Find a concert buddy" />
      </Helmet>
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
