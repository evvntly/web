import React, { useContext } from "react";
import styled from "styled-components";
import Twitter from "../../assets/svgs/twitter.svg";
import { TWITTER_BLUE, TWITTER_BLUE_HOVER, WHITE } from "../../styles/colors";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { myContext } from "../../context/provider";

const TwitterIcon = styled(Twitter)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  background: ${TWITTER_BLUE};
  color: ${WHITE};
  border-color: ${TWITTER_BLUE};
  padding: 10px 25px;
  border-radius: 20px;
  font-size: 15px;
  cursor: pointer;
  margin: 0 0 10px 0;
  &:hover {
    background: ${TWITTER_BLUE_HOVER};
  }
`;

const TwitterAuth = () => {
  const firebase = React.useContext(FirebaseContext);
  const context = useContext(myContext);
  const provider = firebase && new firebase.auth.TwitterAuthProvider();

  const onLoginClick = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        context.setUser(result);
        if (
          process.env.NODE_ENV === "production" &&
          result.additionalUserInfo.isNewUser
        ) {
          window.analytics.track("new_user_account", {
            userName: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            provider: result.user.providerData[0].providerId,
            path: window.location.pathname,
            url: typeof window !== "undefined" ? window.location.href : null,
            referrer: typeof document !== "undefined" ? document.referrer : null
          });
        }
        if (
          process.env.NODE_ENV === "production" &&
          !result.additionalUserInfo.isNewUser
        ) {
          window.analytics.track("returning_user_sign", {
            userName: result.user.displayName,
            email: result.user.email,
            uid: result.user.uid,
            provider: result.user.providerData[0].providerId,
            path: window.location.pathname,
            url: typeof window !== "undefined" ? window.location.href : null,
            referrer: typeof document !== "undefined" ? document.referrer : null
          });
        }
      })
      .then(() => {
        context.setSignin(false);
      })
      .catch(function(error) {
        context.setEmailInUse(error.message);
      });
  };
  return (
    <Button onClick={() => onLoginClick()}>
      <ButtonContainer>
        <TwitterIcon /> <span>Login with Twitter</span>
      </ButtonContainer>
    </Button>
  );
};

export default TwitterAuth;
