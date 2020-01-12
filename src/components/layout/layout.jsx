import React, { useContext, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "../nav/navigation";
import Footer from "../footer/footer";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import SignIn from "../signin";
import debug from "debug";
import PropTypes from "prop-types";
import { BLACK, RONCHI } from "../../styles/colors";
import Video from "../home";

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

const Notice = styled.div`
  height: 50px;
  background: ${RONCHI};
  position: relative;
  z-index: 1000;
  line-height: 50px;
  color: ${BLACK};
  font-family: ${FONT_FAMILY};
  text-align: center;
  font-size: 13px;
`;

const Layout = ({ children }) => {
  const context = useContext(myContext);
  const log = debug("context");
  log("context", context);
  let firebase = React.useContext(FirebaseContext);

  const isHome = window.location.pathname === "/";

  useEffect(() => {
    firebase &&
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          context.setUser(user);
          firebase
            .database()
            .ref(`${context.user.uid}`)
            .on("value", snapshot => {
              if (snapshot && snapshot.exists()) {
                context.setEventData(snapshot.val());
              }
            });
        }
      });
  }, [firebase, context.user]);
  return (
    <>
      <GlobalStyle />
      {!context.withinUs && (
        <Notice>
          Hi! Results are limited outside the US.
          <span role="img" aria-label="crying">
            😭
          </span>
        </Notice>
      )}
      <Navigation />
      {isHome && <Video />}
      {!isHome && <Container>{children}</Container>}
      <Footer />
      {context.signin && <SignIn />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.array
};

export default Layout;
