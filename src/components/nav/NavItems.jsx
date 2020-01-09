import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import UserNav from "./user-nav";
import User from "../../assets/svgs/user.svg";
import { isMobile } from "react-device-detect";
import { FirebaseContext } from "gatsby-plugin-firebase";

const LoginButton = styled.div`
  cursor: pointer;
  color: ${WHITE};
  &:hover {
    color: #f0bb48;
  }
`;

const UserIcon = styled(User)`
  fill: ${WHITE};
  height: 24px;
  width: 24px;
  margin-left: 10px;
`;

const LoginContainer = styled.div`
  display: flex;
  justify-items: center;
  align-content: center;
  &:hover {
    svg {
      fill: #f0bb48;
    }
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
      color: #f0bb48;
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
    font-size: 16px;
    @media (max-width: 769px) and (min-width: 320px) {
      font-family: ${FONT_FAMILY};
      font-size: 20px;
      padding: 10px 0;
    }
  }
`;

const NavItems = () => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);

  const onSignoutClick = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          navigate("/");
          context.setUser(false);
          context.setUserMenu(false);
        },
        error => {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      );
  };

  return (
    <>
      <Items>
        <ul
          onClick={() => {
            if (isMobile) context.setShowHamburger(false);
          }}
        >
          <li>
            <Link to="/" aria-label="Home" activeStyle={{ color: "#f0bb48" }}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/browse-events"
              aria-label="Browse Events"
              activeStyle={{ color: "#f0bb48" }}
            >
              Browse Events
            </Link>
          </li>
          {context.user && (
            <li>
              <Link to="/" aria-label="Logout" onClick={() => onSignoutClick()}>
                Sign Out
              </Link>
            </li>
          )}
          {!context.user && (
            <LoginButton>
              <li onClick={() => context.setSignin(true)}>
                <LoginContainer>
                  LOGIN / SIGNUP
                  <UserIcon />
                </LoginContainer>
              </li>
            </LoginButton>
          )}
          <UserNav />
        </ul>
      </Items>
    </>
  );
};

export default NavItems;
