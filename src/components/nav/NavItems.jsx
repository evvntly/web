import React, { useContext } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import { BLACK, WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";

const Profile = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 45px;
  border: 3px solid #ffffff;
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
      color: #006ebc;
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
    <Items>
      <ul>
        <li>
          <Link to="/" aria-label="Home" activeStyle={{ color: "#006ebc" }}>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            aria-label="About"
            activeStyle={{ color: "#006ebc" }}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/find-buddy"
            aria-label="Find a buddy"
            activeStyle={{ color: "#006ebc" }}
          >
            Find a buddy
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            aria-label="Contact"
            activeStyle={{ color: "#006ebc" }}
          >
            Contact
          </Link>
        </li>
        {context.user && (
          <li>
            <Profile src={context.user.photoURL} />
          </li>
        )}
        {!context.user && (
          <a>
            <li>LOGIN / SIGNUP</li>
          </a>
        )}
      </ul>
    </Items>
  );
};

export default NavItems;
