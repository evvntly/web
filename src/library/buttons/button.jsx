import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  PICTON_BLUE_TRANSPARENT,
  PICTON_BLUE,
  WHITE
} from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const ButtonStyle = styled.button`
  border: ${props =>
    props.disabled
      ? `1px solid ${PICTON_BLUE_TRANSPARENT}`
      : `1px solid ${PICTON_BLUE}`};
  background: ${props =>
    props.disabled ? PICTON_BLUE_TRANSPARENT : PICTON_BLUE};
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  color: ${WHITE};
  font-family: ${FONT_FAMILY};
  padding: 10px 50px;
  font-size: 16px;
  font-weight: ${WEIGHT.NORMAL};
`;

const Button = ({ title, disabled, onClick, type }) => {
  return (
    <ButtonStyle disabled={disabled} onClick={onClick} type={type}>
      {title}
    </ButtonStyle>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

export default Button;
