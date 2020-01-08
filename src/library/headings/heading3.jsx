import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const Title = styled.h3`
  font-size: 1.3rem;
  margin: 0;
  color: ${BLACK};
  font-weight: ${WEIGHT.NORMAL};
  font-family: ${FONT_FAMILY};
`;

const Heading3 = ({ title }) => {
  return <Title>{title}</Title>;
};

Heading3.propTypes = {
  title: PropTypes.string
};

export default Heading3;
