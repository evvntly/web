import styled from "styled-components";
import { FONT_FAMILY } from "./typography";

export const Main = styled.div`
  max-width: 1200px;
  margin: auto;
  font-family: ${FONT_FAMILY};
  padding: 0 50px;
  @media (max-width: 769px) and (min-width: 320px) {
    margin: auto;
    padding: 0 10px;
  }
`;

export const Container = styled.div`
  margin: 25px 0;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media all and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media all and (min-width: 480px) and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media all and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
`;
