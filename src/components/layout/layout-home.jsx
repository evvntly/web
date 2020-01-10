import React, { useContext, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Nav from "../nav/Nav";
import Footer from "../footer/Footer";
import Video from "../video";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { myContext } from "../../context/provider";
import SignIn from "../signin";
import { BLACK } from "../../styles/colors";
import debug from "debug";

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

export const Notice = styled.div`
  height: 50px;
  background: #f0bb48;
  position: relative;
  z-index: 100000000000;
  line-height: 50px;
  color: ${BLACK};
  font-family: ${FONT_FAMILY};
  text-align: center;
  font-size: 13px;
`;

const Content = styled.div``;

const LayoutHome = ({ children }) => {
  const context = useContext(myContext);
  const log = debug("context");
  log("context", context);
  const firebase = React.useContext(FirebaseContext);
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
      <Main>
        {!context.withinUs && (
          <Notice>
            Hey there, search only works within the US. sorry....
            <span role="img" aria-label="crying">
              😭
            </span>
          </Notice>
        )}
        <Nav />
        <Video />
      </Main>
      <Content>{children}</Content>
      <Footer />
      {context.signin && <SignIn />}
    </>
  );
};

export default LayoutHome;
