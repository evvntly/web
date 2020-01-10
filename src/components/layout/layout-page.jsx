import React, { useContext, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import SignIn from "../signin";
import { Notice } from "./layout-home";
import debug from "debug";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

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
  const log = debug("context");
  log("context", context);
  let firebase = React.useContext(FirebaseContext);
  useEffect(() => {
    firebase &&
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          context.setUser(user);
        }
      });
  }, [firebase, context.user]);
  return (
    <>
      <GlobalStyle />
      {!context.withinUs && (
        <Notice>
          Hey there, search only works within the US. sorry....
          <span role="img" aria-label="crying">
            😭
          </span>
        </Notice>
      )}
      <Nav />
      <Container>
        <div>{children}</div>
      </Container>
      <Footer />
      {context.signin && <SignIn />}
    </>
  );
};

export default LayoutPage;
