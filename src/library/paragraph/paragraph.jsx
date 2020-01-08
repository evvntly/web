import React from "react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const ParagraphNormal = styled.p`
  line-height: 1.5rem;
  color: ${BLACK};
  font-size: 1.1rem;
  font-weight: ${WEIGHT.THIN};
  font-family: ${FONT_FAMILY};
`;

const Paragraph = ({ children }) => {
  return <Paragraph>{children}</Paragraph>;
};

export default ParagraphNormal;
