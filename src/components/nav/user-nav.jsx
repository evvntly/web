import React, { useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { myContext } from "../../context/provider";
import { WHITE } from "../../styles/colors";
import { navigate } from "gatsby";
import { FirebaseContext } from "gatsby-plugin-firebase";

const Container = styled.div`
  background: ${WHITE};
  box-shadow: #cccccc 0 0 10px;
  position: absolute;
  width: 220px;
  left: -205px;
  top: 65px;
  text-align: right;
  padding: 0px 20px;
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
  width: 45px;
  height: 45px;
  border-radius: 45px;
  border: 3px solid #ffffff;
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
              onClick={() => context.setUserMenu(!context.userMenu)}
            />
            {context.userMenu && (
              <Container>
                <ul>
                  <li>{`G'day ${context.user.displayName}, you legend!`}</li>
                  <li style={{ cursor: "pointer" }}>My Profile</li>
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
