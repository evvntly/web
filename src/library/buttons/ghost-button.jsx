import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { WHITE, RONCHI } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const ButtonStyle = styled.button`
  border: ${props => `1px solid ${props.color}`};
  background: transparent;
  cursor: pointer;
  color: ${props => props.color};
  font-family: ${FONT_FAMILY};
  padding: 0 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  font-size: ${props => props.fontSize};
  border-radius: ${props =>
    props.borderRadius ? `${props.borderRadius}px` : "0"};
  font-weight: ${WEIGHT.NORMAL};
  &:hover {
    background: ${props => props.color};
    color: ${props => props.textColor};
`;

const GhostButton = ({
  title,
  disabled,
  onClick,
  type,
  color = RONCHI,
  borderRadius,
  textColor = WHITE,
  height = "40px",
  fontSize = "16px",
  width = "auto"
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
      width={width}
    >
      {title}
    </ButtonStyle>
  );
};

GhostButton.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default GhostButton;
