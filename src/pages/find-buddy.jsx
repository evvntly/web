import React, { useContext } from "react";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ParagraphNormal from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { myContext } from "../context/provider";

const Main = styled.div`
  max-width: 1000px;
  margin: auto;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 90%;
    margin: auto;
  }
`;

const Container = styled.div`
  margin: 50px 0;
`;

const FindBuddy = () => {
  const context = useContext(myContext);
  console.log(context);
  console.log(Object.keys(context.data).length);
  return (
    <>
      <Helmet>
        <title>Find a buddy</title>
        <link rel="canonical" href="https://concertbuddy.io/find-buddy" />
        <meta name="description" content="Find a concert buddy" />
      </Helmet>
      <LayoutPage>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="Find Buddy" />
            <ParagraphNormal>Find your buddy</ParagraphNormal>
            {Object.keys(context.data).length !== 0 &&
              context.data.events.length === 0 && (
                <div>{`Sorry no ${context.artistName} events near you`}</div>
              )}
            {context.data &&
              Object.keys(context.data).length !== 0 &&
              context.data.events.map(item => (
                <div key={item.id}>
                  <p>
                    {item.venue.name}, {item.venue.address},{" "}
                    {item.venue.display_location}
                  </p>
                  <p>{item.title}</p>
                </div>
              ))}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default FindBuddy;
