import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { myContext } from "../../context/provider";
import Banner from "../../library/banner";
import Paragraph from "../../library/paragraph/paragraph";
import {
  BLACK,
  FACEBOOK_BLUE,
  FACEBOOK_BLUE_HOVER,
  WHITE
} from "../../styles/colors";
import Facebook from "../../assets/svgs/fb.svg";
import { FONT_FAMILY } from "../../styles/typography";
import { isMobile } from "react-device-detect";

const FacebookIcon = styled(Facebook)`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${BLACK};
  opacity: 0.6;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  backdrop-filter: blur(4px);
`;

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${WHITE};
  height: 30px;
  width: 30px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${FONT_FAMILY};
`;

const Content = styled.div`
  padding: 10px 25px;
  text-align: center;
`;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Modal = styled.div`
  border-radius: 5px;
  height: auto;
  max-width: 500px;
  background: ${WHITE};
  z-index: 5;
  position: relative;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 340px;
  }
`;

const Button = styled.button`
  background: ${FACEBOOK_BLUE};
  color: ${WHITE};
  border-color: ${FACEBOOK_BLUE};
  padding: 15px 50px;
  font-size: 15px;
  cursor: pointer;
  margin: 0 0 10px 0;
  &:hover {
    background: ${FACEBOOK_BLUE_HOVER};
  }
`;

const SignIn = () => {
  const context = useContext(myContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isMobile) context.setShowHamburger(false);
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("signup_modal_opened", {
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
  }, []);

  const firebase = React.useContext(FirebaseContext);
  const provider = firebase && new firebase.auth.FacebookAuthProvider();

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
            path: window.location.pathname,
            url: typeof window !== "undefined" ? window.location.href : null,
            referrer: typeof document !== "undefined" ? document.referrer : null
          });
        }
      })

      .then(() => context.setSignin(false))
      .catch(function(error) {
        context.setError(error);
      });
  };

  const onCloseClick = () => {
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("signup_modal_closed", {
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    context.setSignin(false);
  };
  const images = [
    "basketball",
    "moshpit",
    "hockey",
    "football",
    "baseball",
    "concert"
  ];
  const selectRandomImage = images[Math.floor(Math.random() * images.length)];

  return (
    <Container>
      <ModalContainer>
        <Modal>
          <Banner
            img={selectRandomImage}
            height={175}
            title="You're one step closer to awesome!"
          />
          <Content>
            <Paragraph fontSize="1.2rem">
              Login for free to save events and more!
            </Paragraph>
            {!context.user && (
              <Button onClick={() => onLoginClick()}>
                <ButtonContainer>
                  <FacebookIcon /> <span>Login with Facebook</span>
                </ButtonContainer>
              </Button>
            )}
            <Paragraph fontSize="0.9rem">
              * Currently we only allow users to sign up with Facebook. We want
              to keep this site safe so we try to verify our users as much as
              possible - other signup options coming soon.
            </Paragraph>
          </Content>
          <Close onClick={() => onCloseClick()}>
            <div>X</div>
          </Close>
        </Modal>
      </ModalContainer>
      <Overlay onClick={() => context.setSignin(false)} />
    </Container>
  );
};

export default SignIn;
