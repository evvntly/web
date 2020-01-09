import React, { useContext, useEffect } from "react";
import moment from "moment";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import TextInput from "../library/inputs/text";
import { BLACK } from "../styles/colors";
import SelectInput from "../library/inputs/select";
import Filter from "../components/filter";

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

const BrowseEvents = () => {
  const context = useContext(myContext);

  useEffect(() => {
    fetch(
      `https://api.seatgeek.com/2/events?q=${context.artistName
        .replace(/\s+/g, "-")
        .toLowerCase()}&range=${context.radius}mi&per_page=${
        context.itemsPerPage
      }&geoip=true&client_id=${process.env.GATSBY_API_KEY}`
    )
      .then(response => response.json())
      .then(data => context.setData(data))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, [context.radius, context.itemsPerPage]);

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
            <Heading title="Search Events" />
            <Filter />
            {context.data && Object.keys(context.data).length === 0 && (
              <Paragraph>
                Currently you have not searched for an event start looking for
                your event buddy by using the filter above.
              </Paragraph>
            )}
            {context.data && Object.keys(context.data).length !== 0 && (
              <>
                <Paragraph>
                  {`We are currently showing you events ${
                    context.radius
                  } miles around your
                  current location, please use the filter above to refine your
                  search.`}
                </Paragraph>
              </>
            )}
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
            {context.data &&
              Object.keys(context.data).length !== 0 &&
              context.data.meta.total >= context.data.meta.per_page && (
                <button
                  onClick={() =>
                    context.setItemsPerPage(context.itemsPerPage + 25)
                  }
                >
                  Load More
                </button>
              )}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default BrowseEvents;
