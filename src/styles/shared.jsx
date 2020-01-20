import styled from "styled-components";
import { FONT_FAMILY } from "./typography";
import { PHABLET, PHONE, PHONE_LANDSCAPE, WIDE } from "./breakpoints";

export const Main = styled.div`
  max-width: 1200px;
  margin: auto;
  font-family: ${FONT_FAMILY};
  padding: 0 50px;
  ${PHONE} {
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

  ${WIDE} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  ${PHONE_LANDSCAPE} {
    grid-template-columns: 1fr 1fr;
  }

  ${PHABLET} {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
`;
