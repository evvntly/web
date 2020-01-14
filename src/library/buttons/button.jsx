import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { WHITE, RONCHI } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";
import { lighten } from "polished";

const ButtonStyle = styled.button`
  border: ${props =>
    props.disabled
      ? `1px solid ${lighten(0.2, props.color)}`
      : `1px solid ${props.color}`};
  background: ${props =>
    props.disabled ? lighten(0.2, props.color) : props.color};
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
    background: ${props => lighten(0.1, props.color)};
    border: ${props => `1px solid ${lighten(0.2, props.color)}`}
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

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.string,
  borderRadius: PropTypes.number,
  textColor: PropTypes.string,
  height: PropTypes.string,
  fontSize: PropTypes.string
};

export default Button;
