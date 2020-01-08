import React from "react";
import { Helmet } from "react-helmet";
import LayoutHome from "../components/layout/layout-home";
import styled from "styled-components";
import Heading from "../library/headings/Heading";
import Testimonial from "../library/testimonial";
import ParagraphNormal from "../library/paragraph/paragraph";
import Heading2 from "../library/headings/heading2";
import TCallout from "../library/callout/testimonial-callout";
import { BLACK, WHITE } from "../styles/colors";
import CtaPanel from "../components/cta";

const Main = styled.div`
  max-width: 1000px;
  margin: auto;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 90%;
    margin: auto;
  }
`;

const Container = styled.div`
  margin: 50px 0 0 0;
`;

export default () => {
  return (
    <>
      <Helmet>
        <title>Concert Buddy</title>
        <link rel="canonical" href="/" />
        <meta
          name="description"
          content="Going to a concert or gig solo? Want a buddy to go with? Then you've come to the right place!"
        />
      </Helmet>
      <LayoutHome />
    </>
  );
};
