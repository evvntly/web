import React, { useContext, useEffect } from "react";
import { identify } from "react-fullstory";
import styled, { createGlobalStyle } from "styled-components";
import Navigation from "../nav/navigation";
import Footer from "../footer/footer";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import SignIn from "../signin";
import debug from "debug";
import PropTypes from "prop-types";
import Video from "../home";
import { useWindow } from "../../utils/useWindow";
import LogRocket from "logrocket";

const Container = styled.div`
  position: relative;
  min-height: 100vh;
`;

const VideoContainer = styled.div`
  overflow: hidden;
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

const Layout = ({ children }) => {
  const context = useContext(myContext);
  const log = debug("context");
  log("context", context);
  let firebase = React.useContext(FirebaseContext);

  const isHome = useWindow && window.location.pathname === "/";

  useEffect(() => {
    if (context.user && process.env.NODE_ENV === "production") {
      LogRocket.identify(context.user.uid, {
        name: context.user.displayName,
        email: context.user.email
      });
      identify(context.user.uid, {
        displayName: context.user.displayName,
        email: context.user.email
      });
    }
  }, [context.user]);

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
            .ref(`/users/${context.user.uid}`)
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
      <Navigation />
      {isHome && (
        <VideoContainer>
          <Video />
        </VideoContainer>
      )}
      {!isHome && <Container>{children}</Container>}
      <Footer />
      {context.signin && <SignIn />}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any
};

export default Layout;
