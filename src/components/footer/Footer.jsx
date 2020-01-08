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
      <div>© Copyright 2020 - Made with ❤ by @johnnyxbell</div>
    </Navigation>
  );
};

export default Footer;
