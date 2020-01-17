// @flow

import React from "react";
import styled from "styled-components";
import { WHITE, RONCHI } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";
import { ALPHA } from "../../utils/colorUtils";

const ButtonStyle = styled.button`
  border: ${props =>
    props.disabled
      ? `1px solid ${ALPHA(props.color, 0.5)}`
      : `1px solid ${props.color}`};
  background: ${props =>
    props.disabled ? ALPHA(props.color, 0.5) : props.color};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  color: ${props => props.textColor};
  font-family: ${FONT_FAMILY};
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.height};
  font-size: ${props => props.fontSize};
  border-radius: ${props =>
    props.borderRadius ? `${props.borderRadius}px` : "0"};
  font-weight: ${WEIGHT.NORMAL};
  &:hover {
    background: ${props => ALPHA(props.color, 0.7)};
    border: ${props => `1px solid ${ALPHA(props.color, 0.7)}`}
`;

const Button = ({
  title,
  disabled,
  onClick,
  type,
  color = RONCHI,
  borderRadius,
  textColor = WHITE,
  height = "40px",
  fontSize = "16px"
}: {
  title?: string,
  disabled?: boolean,
  onClick?: Function,
  type?: string,
  color?: string,
  borderRadius?: number,
  textColor?: string,
  height?: string,
  fontSize?: string
}) => {
  return (
    <ButtonStyle
      disabled={disabled}
      color={color}
      onClick={onClick}
      type={type}
      borderRadius={borderRadius}
      textColor={textColor}
      height={height}
      fontSize={fontSize}
    >
      {title}
    </ButtonStyle>
  );
};

export default Button;
