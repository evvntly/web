import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";
import { BLACK } from "../../styles/colors";

const Title = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  text-decoration: underline;
  color: ${props => (props.color ? props.color : BLACK)};
  font-weight: ${WEIGHT.THIN};
  font-family: ${FONT_FAMILY};
`;

const Heading = ({ title, color }) => {
  return (
    <div>
      <Title color={color}>{title}</Title>
    </div>
  );
};

Heading.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string
};

export default Heading;
