import React, { useContext, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";

const Container = styled.div``;

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
  const context = useContext(myContext);
  let firebase = React.useContext(FirebaseContext);
  useEffect(() => {
    firebase &&
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          context.setUser(user);
        } else {
        }
      });
  }, [firebase, context.user]);
  return (
    <>
      <GlobalStyle />
      <Nav />
      <Container>
        <div>{children}</div>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutPage;
