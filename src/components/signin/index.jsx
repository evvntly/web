import React, { useContext, useEffect } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { myContext } from "../../context/provider";
import Banner from "../../library/banner";
import Paragraph from "../../library/paragraph/paragraph";
import { BLACK, RED, TUNDORA, WHITE } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";
import { isMobile } from "react-device-detect";
import FacebookAuth from "./facebook";
import TwitterAuth from "./twitter";
import GoogleAuth from "./google";

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

const LoginItems = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  margin: auto;
`;

const Content = styled.div`
  padding: 10px 25px;
  text-align: center;
  a {
    color: ${TUNDORA};
  }
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

const errorMessageStyle = {
  color: RED,
  fontSize: ".8rem",
  margin: "25px 0"
};

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

  const onCloseClick = () => {
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("signup_modal_closed", {
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    context.setEmailInUse(false);
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
            {!context.emailInUse && (
              <Paragraph fontSize="1.2rem">
                Login for free to save events and more!
              </Paragraph>
            )}
            {context.emailInUse && (
              <Paragraph customStyle={errorMessageStyle}>
                {context.emailInUse}
              </Paragraph>
            )}
            {!context.user && (
              <LoginItems>
                <GoogleAuth />
                <FacebookAuth />
                <TwitterAuth />
              </LoginItems>
            )}
            <Paragraph fontSize="0.9rem">
              * We do not share you details with anyone, we hate spam too. More
              info view our <Link to="/privacy">privacy policy</Link>.
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
