import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const Title = styled.h2`
  font-size: 1.5rem;
  padding: 5px 0 0 0;
  margin: 0;
  color: ${BLACK};
  font-weight: ${WEIGHT.NORMAL};
  font-family: ${FONT_FAMILY};
  text-decoration: underline;
`;

const Heading2 = ({ title }) => {
  return (
    <div>
      <Title>{title}</Title>
    </div>
  );
};

Heading2.propTypes = {
  title: PropTypes.string
};

export default Heading2;
