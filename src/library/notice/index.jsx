// @flow
import React from "react";
import styled from "styled-components";
import { BLACK, RONCHI, TUNDORA } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";
import CloseIcon from "../../assets/svgs/close.svg";
import Info from "../../assets/svgs/error.svg";

const CloseSvg = styled(CloseIcon)`
  width: 12px;
  height: 12px;
  margin: 0 10px 0 0;
  cursor: pointer;
  position: absolute;
  right: 10px;
  path {
    fill: ${BLACK};
  }
`;

const InfoIcon = styled(Info)`
  width: 15px;
  height: 15px;
  position: absolute;
  left: 10px;
  path {
    fill: ${BLACK};
  }
`;

export const Container = styled.div`
  height: auto;
  background: ${props => props.color};
  position: relative;
  margin: 0 0 25px 0;
  padding: 10px 0;
  border-radius: 4px;
  color: ${BLACK};
  font-family: ${FONT_FAMILY};
  text-align: center;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: ${TUNDORA};
    text-decoration: underline;
  }
`;

export const Content = styled.div`
  width: 70%;
  margin: auto;
`;

const Notice = ({
  children,
  onDismiss,
  icon,
  color = RONCHI
}: {
  onDismiss?: Function,
  children: any,
  icon?: any,
  color?: string
}) => {
  return (
    <>
      <Container color={color} onDismiss={onDismiss} icon={icon}>
        {icon && <InfoIcon />}
        <Content>{children}</Content>
        {onDismiss && <CloseSvg onClick={onDismiss} />}
      </Container>
    </>
  );
};

export default Notice;
