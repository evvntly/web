import React, { useContext } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { BLACK, GREY, SILVER, WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import NavItems from "./nav-items";
import Logo from "../../assets/svgs/logo.svg";
import { myContext } from "../../context/provider";
import { PHONE } from "../../styles/breakpoints";
import Notice from "../../library/notice";

const Nav = styled.nav`
  ${PHONE} {
    display: none;
  }
  top: 0;
  z-index: 1;
  padding: 0;
  margin: 0;
  position: absolute;
  width: 100%;
  background: ${GREY};
  font-family: ${FONT_FAMILY};
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
    margin-right: 25px;
    &:last-child {
      margin: 0;
    }
  }
`;

const NavWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 50px 3px 50px;
  ${PHONE} {
    padding: 10px 0 3px 0;
  }
  min-height: 70px;
`;

const Hamburger = styled.div`
  font-size: 20px;
`;

const LogoIcon = styled(Logo)`
  height: 65px;
`;

const MobileNav = styled.nav`
  ${PHONE} {
    display: flex;
  }
  @media (min-width: 769px) {
    display: none;
  }
  position: absolute;
  padding: 0 10px;
  box-sizing: border-box;
  margin: 0;
  top: 0;
  height: 65px;
  width: 100%;
  z-index: 5;
  background: ${GREY};
  font-family: ${FONT_FAMILY};
  justify-content: space-between;
  align-items: center;
`;

const MobileItems = styled.div`
  top: 0;
  position: absolute;
  z-index: 5;
  width: 100%;
  background: ${BLACK};
  height: 100vh;
  padding-top: 50px;
`;

const HamburgerIcon = styled.div`
  z-index: 5;
  position: absolute;
  padding: 0 10px;
  right: 15px;
  top: 20px;
  height: 25px;
  width: 25px;
  &:before {
    content: "";
    position: absolute;
    width: 1.4em;
    height: 0.15em;
    background: ${WHITE};
    box-shadow: 0 0.5em 0 0 ${WHITE}, 0 1em 0 0 ${WHITE};
  }
`;

const MobileLogo = styled.div`
  padding-top: 8px;
  svg {
    height: 45px;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 25px;
  top: 15px;
  width: 25px;
  height: 25px;
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 33px;
    width: 4px;
    background-color: ${SILVER};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const Navigation = () => {
  const context = useContext(myContext);
  return (
    <>
      <Nav showNotice={!context.withinUs}>
        <Notice
        >
          <div>
            DUE TO COVID-19 PLEASE STAY AT HOME - WE WILL BE BACK AFTER THIS.
          </div>
        </Notice>
        <NavWrapper>
          <Link to="/" aria-label="Concert Buddy">
            <LogoIcon />
          </Link>
          <NavItems />
        </NavWrapper>
      </Nav>
      <MobileNav>
        <Link to="/" aria-label="Concert Buddy">
          <MobileLogo>
            <LogoIcon />
          </MobileLogo>
        </Link>
        <Hamburger
          onClick={() => {
            context.setShowHamburger(!context.showHamburger);
          }}
        >
          <HamburgerIcon />
        </Hamburger>
      </MobileNav>
      {context.showHamburger && (
        <MobileItems>
          <CloseIcon
            onClick={() => {
              context.setShowHamburger(!context.showHamburger);
            }}
          />
          <NavItems />
        </MobileItems>
      )}
    </>
  );
};

export default Navigation;
