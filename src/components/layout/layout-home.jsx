import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import Video from "../video";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    ul li {
      font-family: ${FONT_FAMILY};
      font-weight: ${WEIGHT.THIN};
      font-size: 1.1rem;
    }
  }
`;

const Main = styled.div`
  max-height: 100vh;
  height: 100vh;
`;

const Content = styled.div``;

const LayoutHome = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Main>
        <Nav />
        <Video />
      </Main>
      <Content>{children}</Content>
      <Footer />
    </>
  );
};

export default LayoutHome;
