import React from "react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const ParagraphNormal = styled.p`
  color: ${BLACK};
  font-size: ${props => props.fontSize};
  font-weight: ${WEIGHT.THIN};
  font-family: ${FONT_FAMILY};
`;

const Paragraph = ({ children, fontSize = "1.1rem" }) => {
  return <ParagraphNormal fontSize={fontSize}>{children}</ParagraphNormal>;
};

export default Paragraph;
