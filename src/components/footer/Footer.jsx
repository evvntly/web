import React from "react";
import styled from "styled-components";
import { WHITE, SILVER } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";

const Navigation = styled.footer`
  height: 50px;
  width: 100%;
  background: black;
  z-index: 1;
  font-family: ${FONT_FAMILY};
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    color: ${SILVER};
    font-size: 0.8rem;
  }
  a {
    color: ${WHITE};
    text-decoration: none;
  }
`;

const Footer = () => {
  return (
    <Navigation>
      <div>
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
      </div>
    </Navigation>
  );
};

export default Footer;
