import React from "react";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ParagraphNormal from "../library/paragraph/paragraph";
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
  margin: 50px 0;
`;

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <link rel="canonical" href="https://concertbuddy.io/contact" />
        <meta name="description" content="Find a concert buddy" />
      </Helmet>
      <LayoutPage>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Contact us" />
            <ParagraphNormal>Coming Soon</ParagraphNormal>
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default Contact;
