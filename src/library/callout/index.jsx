import React from "react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";

const Container = styled.div`
  padding: 15px 0;
  background: ${props => (props.color ? props.color : BLACK)};
`;

const Callout = ({ children, color }) => {
  return <Container color={color}>{children}</Container>;
};

export default Callout;
