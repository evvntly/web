import React from "react";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";

const Main = styled.div`
  max-width: 1000px;
  margin: auto;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 90%;
    margin: auto;
  }
`;

const Container = styled.div`
  margin: 25px 0;
`;

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
        <link rel="canonical" href="https://concertbuddy.io/about" />
        <meta name="description" content="Find a concert buddy" />
      </Helmet>
      <LayoutPage>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="About" />
            <Paragraph>Coming soon...</Paragraph>
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default About;
