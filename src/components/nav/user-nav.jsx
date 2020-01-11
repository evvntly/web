import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { myContext } from "../../context/provider";
import { WHITE } from "../../styles/colors";
import { Link, navigate } from "gatsby";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { isMobile } from "react-device-detect";

const Container = styled.div`
  background: ${WHITE};
  box-shadow: #cccccc 0 0 10px;
  position: absolute;
  width: 220px;
  left: -205px;
  top: 60px;
  text-align: right;
  padding: 0 20px;
  a {
    color: black !important;
    text-transform: none !important;
    &:hover {
      color: #f0bb48 !important;
    }
  }
  ul {
    justify-content: flex-end;
    flex-direction: column;
    align-items: flex-end !important;
    padding: 10px 0 !important;
    li {
      text-align: right;
      padding: 3px 0;
      margin: 0;
    }
  }
`;

const Profile = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: 2px solid #ffffff;
  cursor: pointer;
`;

const UserNav = () => {
  const wrapperRef = useRef(null);
  const useOutsideAlerter = ref => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        context.setUserMenu(false);
      }
    };

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    });
  };

  useOutsideAlerter(wrapperRef);
  const firebase = React.useContext(FirebaseContext);
  const context = useContext(myContext);
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
      {context.user && (
        <div ref={wrapperRef}>
          <li style={{ position: "relative" }}>
            <Profile
              src={context.user.photoURL}
              onClick={() =>
                !isMobile
                  ? context.setUserMenu(!context.userMenu)
                  : navigate("/my-profile")
              }
            />
            {context.userMenu && (
              <Container>
                <ul>
                  <li>{`G'day ${context.user.displayName}, you legend!`}</li>
                  <Link
                    onClick={() => context.setUserMenu(false)}
                    to="/my-profile"
                    aria-label="My Profile"
                  >
                    <li>My Profile</li>
                  </Link>
                  <Link
                    onClick={() => context.setUserMenu(false)}
                    to="/my-events"
                    aria-label="My Events"
                  >
                    <li>My Events</li>
                  </Link>
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() => onSignoutClick()}
                  >
                    Sign out
                  </li>
                </ul>
              </Container>
            )}
          </li>
        </div>
      )}
    </>
  );
};

export default UserNav;
