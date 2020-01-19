// @flow
import React from "react";
import styled from "styled-components";
import { BLACK, TUNDORA, WHITE } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";
import CloseIcon from "../../assets/svgs/close.svg";

const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: ${BLACK};
  opacity: 0.6;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  backdrop-filter: blur(4px);
`;

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`;

const Close = styled.div`
  cursor: pointer;
  position: absolute;
  top: -10px;
  right: -10px;
  background: ${WHITE};
  height: 30px;
  width: 30px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${FONT_FAMILY};
  border: 1px solid ${BLACK};
`;

const CloseSvg = styled(CloseIcon)`
  width: 12px;
  height: 12px;
  path {
    fill: ${BLACK};
  }
`;

const Content = styled.div``;

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const ModalBody = styled.div`
  border-radius: 5px;
  height: auto;
  max-width: 500px;
  background: ${WHITE};
  z-index: 5;
  position: relative;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 340px;
  }
`;

const Modal = ({
  children,
  onDismiss
}: {
  onDismiss: Function,
  children: any
}) => {
  return (
    <>
      <Container>
        <ModalContainer>
          <ModalBody>
            <Content>{children}</Content>
            <Close onClick={() => onDismiss()}>
              <CloseSvg />
            </Close>
          </ModalBody>
        </ModalContainer>
        <Overlay onClick={() => onDismiss()} />
      </Container>
    </>
  );
};

export default Modal;
