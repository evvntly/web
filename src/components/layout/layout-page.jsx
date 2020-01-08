import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";

const Container = styled.div``;

const Main = styled.main``;

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

const LayoutPage = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Container>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutPage;
