import React, { useContext } from "react";
import moment from "moment";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
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
  console.log("user", context.user);
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
            <Heading title="Find your event buddy" />
            <Paragraph>{`Upcoming events for ${
              context.artistName
            } 👇👇👇👇`}</Paragraph>
            {Object.keys(context.data).length !== 0 &&
              context.data.events.length === 0 && (
                <div>{`Sorry no ${context.artistName} events near you`}</div>
              )}
            {context.data &&
              Object.keys(context.data).length !== 0 &&
              context.data.events.map(item => (
                <div
                  style={{
                    padding: "10px",
                    margin: "20px 0",
                    border: "1px solid black"
                  }}
                  key={item.id}
                >
                  <p>
                    {moment(item.datetime_local).format("dddd")},{" "}
                    {moment(item.datetime_local).format("MMMM Do YYYY, h:mma")}
                  </p>
                  <p>{item.title}</p>
                  <p>
                    {item.venue.name}, {item.venue.address},{" "}
                    {item.venue.display_location}
                  </p>
                  {item.performers[0].image && (
                    <div>
                      <img src={item.performers[0].image} alt={item.title} />
                    </div>
                  )}
                  <button
                    onClick={() =>
                      context.user
                        ? alert("find buddy")
                        : context.setSignin(true)
                    }
                  >
                    Find buddy
                  </button>
                </div>
              ))}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default FindBuddy;
