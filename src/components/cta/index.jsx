import React from "react";
import styled from "styled-components";
import { WHITE } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";
import ParagraphNormal from "../../library/paragraph/paragraph";
import { Link } from "gatsby";
import { VERSION } from "../../constants/version";

const Container = styled.div`
  text-align: center;
  background-image: url("https://assets.stressproof.com.au/images/cta-bg.png");
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: bottom right;
  padding: 50px 0;
  background-color: #eeeeee;
`;

const H3 = styled.h3`
  font-family: ${FONT_FAMILY};
  font-size: 25px;
  margin: 0;
  text-align: center;
`;

const H4 = styled.h3`
  font-size: 20px;
  margin: 0;
  font-family: ${FONT_FAMILY};
  text-align: center;
`;

const Button = styled.div`
  font-weight: bold;
  border: 2px solid #006ebc;
  background: #006ebc;
  padding: 10px 40px;
  margin-top: 10px;
  display: inline-block;
  color: ${WHITE};
  text-transform: uppercase;
  font-family: ${FONT_FAMILY};
  text-align: center;
  :hover {
    background: ${WHITE};
    color: #006ebc;
  }
`;

const CtaPanel = () => {
  return (
    <Container>
      <H3>Ready to eliminate stress?</H3>
      <H4> Book a no-obligation, free consultation.</H4>
      <ParagraphNormal>
        Schedule a free 20-minute call to find out if Stress-Proof is right for
        you.
      </ParagraphNormal>
      <Link
        to="/free-consultation"
        aria-label="Book your 20 minute free consultation with Stress-Proof"
        onClick={() => {
          window.analytics.track("CTA", {
            path: window.location.pathname,
            url: typeof window !== "undefined" ? window.location.href : null,
            referrer:
              typeof document !== "undefined" ? document.referrer : null,
            branch: VERSION
          });
        }}
      >
        <Button>Book a free consultation</Button>
      </Link>
    </Container>
  );
};

export default CtaPanel;
