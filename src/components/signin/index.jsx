import React, { useContext } from "react";
import styled from "styled-components";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { myContext } from "../../context/provider";
import { navigate } from "gatsby";

const Overlay = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: #000;
  opacity: 0.6;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
`;

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Modal = styled.div`
  height: 500px;
  width: 500px;
  background: white;
  z-index: 5;
  position: relative;
`;

const SignIn = () => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);
  const provider = firebase && new firebase.auth.FacebookAuthProvider();

  const onLoginClick = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        context.setUser(result);
      })
      .then(() => context.setSignin(false))
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
    <Container>
      <ModalContainer>
        <Modal>
          {!context.user && (
            <button onClick={() => onLoginClick()}>Login</button>
          )}
          <div onClick={() => context.setSignin(false)}>close</div>
        </Modal>
      </ModalContainer>

      <Overlay />
    </Container>
  );
};

export default SignIn;
