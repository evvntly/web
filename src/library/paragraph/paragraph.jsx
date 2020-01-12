import React from "react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";
import PropTypes from "prop-types";

const ParagraphNormal = styled.p`
  color: ${BLACK};
  font-size: ${props => props.fontSize};
  font-weight: ${WEIGHT.THIN};
  font-family: ${FONT_FAMILY};
`;

const Paragraph = ({ children, fontSize = "1.1rem", customStyle }) => {
  return (
    <ParagraphNormal style={customStyle} fontSize={fontSize}>
      {children}
    </ParagraphNormal>
  );
};

Paragraph.propTypes = {
  customStyle: PropTypes.string,
  fontSize: PropTypes.string,
  children: PropTypes.object
};

export default Paragraph;
