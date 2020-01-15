import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FONT_FAILY_HEADING, WEIGHT } from "../../styles/typography";
import { GREY } from "../../styles/colors";

const Title = styled.h1`
  font-size: 1.6rem;
  text-align: left;
  color: ${props => (props.color ? props.color : GREY)};
  font-weight: ${WEIGHT.BOLD};
  font-family: ${FONT_FAILY_HEADING};
  text-transform: uppercase;
`;

const Heading = ({ title, color }) => {
  return <Title color={color}>{title}</Title>;
};

Heading.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

export default Heading;
