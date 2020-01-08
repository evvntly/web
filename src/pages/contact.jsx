import React, { useContext } from "react";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { navigate } from "gatsby";
import ParagraphNormal from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { myContext } from "../context/provider";

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
  const context = useContext(myContext);
  let firebase = React.useContext(FirebaseContext);
  const provider = firebase && new firebase.auth.FacebookAuthProvider();

  const onLoginClick = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        context.setUser(result);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const onLogoutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function() {
          navigate("/");
        },
        function(error) {
          // An error happened.
        }
      );
  };

  console.log("test", context.user);

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
            {!context.user && (
              <button onClick={() => onLoginClick()}>Login</button>
            )}
            {context.user && (
              <button onClick={() => onLogoutClick()}>Logout</button>
            )}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default Contact;
