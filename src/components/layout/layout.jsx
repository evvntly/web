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
import { useWindow } from "../../utils/useWindow";
import UserReport from "../user-report";
import { isMobile } from "react-device-detect";
import { Helmet } from "react-helmet/es/Helmet";

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

  const isHome = useWindow && window.location.pathname === "/";

  useEffect(() => {
    if (context.isAuthPage && !context.user) {
      context.setSignin(true);
    }
    firebase &&
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          context.SetUserLoading(false);
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
      <Helmet>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Helmet>
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
      {!isMobile && <UserReport />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any
};

export default Layout;
