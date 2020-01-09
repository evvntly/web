import React from "react";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";

const Main = styled.div`
  max-width: 1000px;
  margin: auto;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 90%;
    margin: auto;
  }
`;

const Container = styled.div`
  margin: 25px 0;
`;

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
        <link rel="canonical" href="https://concertbuddy.io/about" />
        <meta name="description" content="Find a concert buddy" />
      </Helmet>
      <LayoutPage>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="About us" />
            <Paragraph>Coming soon...</Paragraph>
            {/*<Paragraph>*/}
            {/*  Hi, welcome to concert buddy where we help connect concert goers*/}
            {/*  with each other!*/}
            {/*</Paragraph>*/}
            {/*<Paragraph>*/}
            {/*  Do you go to concerts solo a lot? Wouldn't it be cool if you could*/}
            {/*  meetup with another solo concert goer, maybe have a beer before*/}
            {/*  the show and mosh with them at the show?*/}
            {/*</Paragraph>*/}
            {/*<Paragraph>Well now you can!</Paragraph>*/}
            {/*<Paragraph>*/}
            {/*  Enough of the sales jargon, So I created this app because*/}
            {/*  throughout my late teens, and 20's I would go to a lot of*/}
            {/*  concerts, but none of my friends liked the same music as I did, so*/}
            {/*  I went to a bunch of these shows alone. If I had a buddy to meet*/}
            {/*  up with, go to the show with and possibly become friends that go*/}
            {/*  to a bunch of shows together that would have been great!*/}
            {/*</Paragraph>*/}
            {/*<Paragraph>So that's how Concert Buddy was born.</Paragraph>*/}
            {/*<Paragraph>*/}
            {/*  We are using the Seat Geek API right now so only Concert Buddy is*/}
            {/*  limited to the USA at the moment.*/}
            {/*</Paragraph>*/}
            {/*<Paragraph>*/}
            {/*  We take the safety of our users very seriously, we take great*/}
            {/*  measures on keeping our users safe, if are reported as a bad user*/}
            {/*  you will be banned.*/}
            {/*</Paragraph>*/}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default About;
