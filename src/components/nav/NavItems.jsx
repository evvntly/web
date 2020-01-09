import React, { useContext } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import UserNav from "./user-nav";

const LoginButton = styled.div`
  cursor: pointer;
  color: ${WHITE};
  &:hover {
    color: #1ca1ff;
  }
`;

const Items = styled.nav`
  a {
    color: ${WHITE};
    @media (max-width: 769px) and (min-width: 320px) {
      color: ${WHITE};
    }
    font-weight: ${WEIGHT.NORMAL};
    text-decoration: none;
    text-transform: uppercase;
    :hover {
      color: #1ca1ff;
    }
  }
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    @media (max-width: 769px) and (min-width: 320px) {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      width: 100%;
    }
  }
  li {
    list-style-type: none;
    font-weight: ${WEIGHT.NORMAL};
    @media (max-width: 769px) and (min-width: 320px) {
      font-family: ${FONT_FAMILY};
      font-size: 20px;
      padding: 10px 0;
    }
  }
`;

const NavItems = () => {
  const context = useContext(myContext);

  return (
    <>
      <Items>
        <ul>
          <li>
            <Link to="/" aria-label="Home" activeStyle={{ color: "#1ca1ff" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              aria-label="About"
              activeStyle={{ color: "#1ca1ff" }}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/find-buddy"
              aria-label="Find a buddy"
              activeStyle={{ color: "#1ca1ff" }}
            >
              Find a buddy
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              aria-label="Contact"
              activeStyle={{ color: "#1ca1ff" }}
            >
              Contact
            </Link>
          </li>
          <UserNav />
          {!context.user && (
            <LoginButton>
              <li onClick={() => context.setSignin(true)}>LOGIN / SIGNUP</li>
            </LoginButton>
          )}
        </ul>
      </Items>
    </>
  );
};

export default NavItems;
