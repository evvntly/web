//@flow
import React, { useContext } from "react";
import styled from "styled-components";
import Modal from "../modal";
import Paragraph from "../../library/paragraph/paragraph";
import Button from "../../library/buttons/button";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { RED, WHITE } from "../../styles/colors";

const Content = styled.div`
  width: 450px;
  text-align: left;
  box-sizing: border-box;
  padding: 35px 20px;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 340px;
  }
`;

const DeleteAccountModal = ({
  onDismiss,
  onComplete
}: {
  onDismiss: Function,
  onComplete: Function
}) => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);

  const onDeleteClick = () => {
    const me = firebase.auth().currentUser;
    me.delete()
      .then(function() {
        context.setUser(false);
        context.setSignin(false);
        onComplete();
        window.location.href = "/";
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Modal onDismiss={onDismiss}>
      <Content>
        <Paragraph customStyle={{ fontWeight: "bold", margin: 0 }}>
          Delete your account?
        </Paragraph>
        <Paragraph customStyle={{ color: RED, fontSize: ".9rem" }}>
          *If you delete your account all your data will be completely removed
          including any events you&apos;ve saved.
        </Paragraph>

        <Button
          height="40px"
          fontSize="15px"
          borderRadius={2}
          textColor={WHITE}
          color={RED}
          title="Yes please delete my account"
          onClick={() => onDeleteClick()}
        />
      </Content>
    </Modal>
  );
};

export default DeleteAccountModal;
