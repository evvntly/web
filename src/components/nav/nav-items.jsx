import React, { useContext } from "react";
import { Link, navigate } from "gatsby";
import styled from "styled-components";
import { RONCHI, WHITE } from "../../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import UserNav from "./user-nav";
import User from "../../assets/svgs/user.svg";
import { isMobile } from "react-device-detect";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { PHONE } from "../../styles/breakpoints";

const LoginButton = styled.div`
  cursor: pointer;
  color: ${WHITE};
  &:hover {
    color: ${RONCHI};
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
      fill: ${RONCHI};
    }
  }
`;

const Items = styled.nav`
  a {
    color: ${WHITE};
    ${PHONE} {
      color: ${WHITE};
    }
    font-weight: ${WEIGHT.NORMAL};
    text-decoration: none;
    text-transform: uppercase;
    :hover {
      color: ${RONCHI};
    }
  }
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    align-items: center;
    ${PHONE} {
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
    ${PHONE} {
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
    context.setEmailInUse(false);
    context.setSignin(false);
    context.setIsAuthPage(false);
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

  const onSignUpClick = () => {
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("signup_clicked", {
        position: "navigation",
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    context.setSignin(true);
  };

  return (
    <>
      <Items>
        <ul
          role="button"
          onKeyDown={() => {
            if (isMobile) context.setShowHamburger(false);
          }}
          onClick={() => {
            if (isMobile) context.setShowHamburger(false);
          }}
        >
          <li>
            <Link to="/" aria-label="Home" activeStyle={{ color: RONCHI }}>
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/virtual-events"
              aria-label="Virtual Events"
              activeStyle={{ color: RONCHI }}
            >
              Virtual Events
            </Link>
          </li>
          <li>
            <Link
              to="/browse-events"
              aria-label="Browse Events"
              activeStyle={{ color: RONCHI }}
            >
              Browse Events
            </Link>
          </li>
          {context.user && (
            <li>
              <Link
                to="/my-events"
                aria-label="My Events"
                activeStyle={{ color: RONCHI }}
              >
                My Events
              </Link>
            </li>
          )}
          {context.user && isMobile && (
            <li>
              <Link to="/my-profile" aria-label="My Profile">
                My Profile
              </Link>
            </li>
          )}
          {context.user && isMobile && (
            <li>
              <Link to="/" aria-label="Logout" onClick={() => onSignoutClick()}>
                Sign Out
              </Link>
            </li>
          )}
          {!context.user && (
            <LoginButton>
              <li
                tabIndex={0}
                role="button"
                onKeyDown={() => onSignUpClick()}
                onClick={() => onSignUpClick()}
              >
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
