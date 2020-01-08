import React, { useState } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import NavItems from "./NavItems";
import { VERSION } from "../../constants/version";

const Navigation = styled.nav`
  @media (max-width: 769px) and (min-width: 320px) {
    display: none;
  }
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  height: 80px;
  width: 100%;
  background: ${WHITE};
  z-index: 1;
  font-family: ${FONT_FAMILY};
  display: flex;
  justify-content: space-around;
  align-items: center;
  a {
    font-weight: ${WEIGHT.NORMAL};
    text-decoration: none;
  }
  ul {
    display: flex;
    padding: 0;
    margin: 0;
  }
  li {
    list-style-type: none;
    font-weight: ${WEIGHT.NORMAL};
    margin-right: 20px;
    &:last-child {
      margin: 0;
    }
  }
`;

const Hamburger = styled.div`
  font-size: 20px;
`;

const MobileNav = styled.nav`
  @media (max-width: 769px) and (min-width: 320px) {
    display: flex;
  }
  @media (min-width: 769px) {
    display: none;
  }
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0;
  position: absolute;
  top: 0;
  height: 50px;
  width: 100%;
  background: ${WHITE};
  z-index: 1;
  font-family: ${FONT_FAMILY};
  justify-content: space-between;
  align-items: center;
`;

const MobileItems = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  background: black;
  height: 100vh;
  top: 50px;
`;

const HamburgerIcon = styled.div`
  position: absolute;
  padding: 0 10px;
  right: 15px;
  top: 13px;
  height: 25px;
  width: 25px;
  &:before {
    content: "";
    position: absolute;
    width: 1.4em;
    height: 0.15em;
    background: black;
    box-shadow: 0 0.5em 0 0 black, 0 1em 0 0 black;
  }
`;

const MobileLogo = styled.div`
  padding-top: 8px;
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 25px;
  top: 7px;
  width: 25px;
  height: 25px;
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 4px;
    background-color: #333;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const Nav = () => {
  const [showHamburger, setShowHamburger] = useState(false);
  return (
    <>
      <Navigation>
        <Link to="/" aria-label="Concert Buddy">
          logo
        </Link>
        <NavItems />
      </Navigation>
      <MobileNav>
        <Link to="/" aria-label="Concert Buddy">
          <MobileLogo>Logo</MobileLogo>
        </Link>
        <Hamburger
          onClick={() => {
            setShowHamburger(!showHamburger);
          }}
        >
          {showHamburger ? <CloseIcon /> : <HamburgerIcon />}
        </Hamburger>
      </MobileNav>
      {showHamburger && (
        <MobileItems>
          <NavItems />
        </MobileItems>
      )}
    </>
  );
};

export default Nav;
