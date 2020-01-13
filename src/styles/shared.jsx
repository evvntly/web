import styled from "styled-components";
import { FONT_FAMILY } from "./typography";

export const Main = styled.div`
  max-width: 1000px;
  margin: auto;
  font-family: ${FONT_FAMILY};
  @media (max-width: 769px) and (min-width: 320px) {
    width: 90%;
    margin: auto;
  }
`;

export const Container = styled.div`
  margin: 25px 0;
`;
