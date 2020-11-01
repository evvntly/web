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
import GoogleAuth from "./google";
import CloseIcon from "../../assets/svgs/close.svg";
import { PHONE } from "../../styles/breakpoints";

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
  z-index: 1;
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
  z-index: 2;
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

const CloseSvg = styled(CloseIcon)`
  width: 12px;
  height: 12px;
  path {
    fill: ${BLACK};
  }
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
  ${PHONE} {
    width: 340px;
  }
`;

const errorMessageStyle = {
  color: RED,
  fontSize: ".8rem",
  margin: "25px 0"
};

const loggedOutMessageStyle = {
  color: RED,
  fontSize: "1.5rem",
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

  const onOverlayClick = () => {
    if (!context.isAuthPage) {
      context.setSignin(false);
    }
  };

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
    <>
      {!context.user && (
        <Container>
          <ModalContainer>
            <Modal>
              {!context.isAuthPage && (
                <Banner
                  img={selectRandomImage}
                  height={175}
                  title="You're one step closer to awesome!"
                />
              )}
              <Content>
                {!context.emailInUse && !context.isAuthPage && (
                  <Paragraph fontSize="1.2rem">
                    Login for free to save events and more!
                  </Paragraph>
                )}
                {context.emailInUse && (
                  <Paragraph customStyle={errorMessageStyle}>
                    {context.emailInUse}
                  </Paragraph>
                )}

                {context.isAuthPage && (
                  <Paragraph customStyle={loggedOutMessageStyle}>
                    You must be signed in to see this page.
                  </Paragraph>
                )}

                <LoginItems>
                  <GoogleAuth />
                  <FacebookAuth />
                </LoginItems>

                <Paragraph fontSize="0.9rem">
                  * We do not share you details with anyone, we hate spam too.
                  More info view our <Link to="/privacy">privacy policy</Link>.
                </Paragraph>
              </Content>
              {!context.isAuthPage && (
                <Close onClick={() => onCloseClick()}>
                  <CloseSvg />
                </Close>
              )}
            </Modal>
          </ModalContainer>
          <Overlay onClick={() => onOverlayClick()} />
        </Container>
      )}
    </>
  );
};

export default SignIn;
