import React from "react";
import styled from "styled-components";
import { WHITE, GREY, BLACK } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";
import { Link } from "gatsby";
import Gatsby from "../../assets/svgs/gatsby.svg";
import Netlify from "../../assets/svgs/netlify.svg";
import SeatGeek from "../../assets/svgs/seatgeek.svg";

const Navigation = styled.footer`
  border-top: 6px solid ${BLACK};
  width: 100%;
  background: ${GREY};
  position: relative;
  font-family: ${FONT_FAMILY};
  padding: 20px 0;
  a,
  span {
    color: ${WHITE};
    text-decoration: none;
    cursor: pointer;
  }
  ul {
    padding: 0;
    margin: 5px 0;
    list-style: none;
    li {
      font-size: 14px;
    }
  }
`;

const Gatsbyogo = styled(Gatsby)`
  width: 70px;
`;

const NetlifyLogo = styled(Netlify)`
  zoom: 45%;
  margin-bottom: 15px;
`;

const SeatGeekLogo = styled(SeatGeek)`
  width: 90px;
  margin-bottom: 10px;
`;

const Logos = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 0 0 0;
`;

const Section = styled.div``;

const Container = styled.div`
  max-width: 1000px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 769px) and (min-width: 320px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
  grid-gap: 20px;
`;

const Title = styled.div`
  font-family: ${FONT_FAMILY};
  font-size: 18px;
  color: ${WHITE};
`;

const Copyright = styled.div`
  text-align: center;
  max-width: 1000px;
  margin: 10px auto 0 auto;
  font-size: 12px;
  color: ${WHITE};
`;

const Footer = () => {
  return (
    <Navigation>
      <Container>
        <Section>
          <Title>Services</Title>
          <ul>
            <li>
              <Link to="/browse-events" aria-label="Advertise">
                Browse Events
              </Link>
            </li>
            <li>
              <Link to="/advertise" aria-label="Advertise">
                Advertise
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/johnnyxbell/eventfinda"
                rel="noopener noreferrer"
                target="_blank"
              >
                OpenSource - Contribute
              </a>
            </li>
          </ul>
        </Section>
        <Section>
          <Title>About</Title>
          <ul>
            <li>
              <Link to="/contact" aria-label="Contact">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" aria-label="Privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/about" aria-label="About">
                About
              </Link>
            </li>
            <li>
              <span
                tabIndex={0}
                role="button"
                aria-label="Feedback & Bugs"
                onClick={() => window._urq.push(["Feedback_Open"])}
                onKeyDown={() => window._urq.push(["Feedback_Open"])}
              >
                Feedback / Bugs
              </span>
            </li>
          </ul>
        </Section>
        <Section>
          <Title>Proudly Built With️</Title>
          <Logos>
            <a
              href="https://www.seatgeek.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SeatGeekLogo />
            </a>
            <a
              href="https://www.netlify.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <NetlifyLogo />
            </a>
            <a
              href="https://www.gatsbyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Gatsbyogo />
            </a>
          </Logos>
        </Section>
      </Container>

      <Copyright>
        © Copyright 2020 - Made with{" "}
        <span
          role="img"
          aria-label="Love Heart"
          style={{ color: "red", padding: "0 0 0 4px" }}
        >
          ❤️
        </span>{" "}
        by{" "}
        <a
          href="https://www.twitter.com/johnnyxbell"
          rel="noopener noreferrer"
          target="_blank"
        >
          @johnnyxbell
        </a>
      </Copyright>
    </Navigation>
  );
};

export default Footer;
