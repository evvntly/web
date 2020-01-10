import React, { useContext, useEffect } from "react";
import moment from "moment";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import Filter from "../components/filter";
import { FONT_FAMILY } from "../styles/typography";
import { BLACK } from "../styles/colors";

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 769px) and (min-width: 320px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
`;

const Item = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Content = styled.div`
  padding: 10px;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
`;

const ButtonSecondary = styled.div`
  cursor: pointer;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: normal;
  border: 2px solid #f0bb48;
  padding: 0 40px;
  color: ${BLACK};
  background: #f0bb48;
  width: max-content;
  :hover {
    background: transparent;
    color: #f0bb48;
  }
  @media (max-width: 769px) and (min-width: 320px) {
    margin: 10px 0;
  }
`;

const EventImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 150px;
`;

const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background: #ccc;
  font-family: ${FONT_FAMILY};
  color: #dddddd;
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: center;
`;

const BrowseEvents = () => {
  const context = useContext(myContext);
  const lat = context.location && context.location.latlng.lat;
  const lon = context.location && context.location.latlng.lng;

  useEffect(() => {
    fetch(
      `https://api.seatgeek.com/2/events?q=${context.artistName
        .replace(/\s+/g, "-")
        .toLowerCase()}&range=${context.radius}mi&per_page=${
        context.itemsPerPage
      }&geoip=true${
        context.location ? `&lat=${lat}&lon=${lon}` : ""
      }&client_id=${process.env.GATSBY_API_KEY}`
    )
      .then(response => response.json())
      .then(data => context.setData(data))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, [context.radius, context.itemsPerPage, context.location]);

  return (
    <>
      <Helmet>
        <title>Search Events</title>
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
            {context.data &&
              Object.keys(context.data).length !== 0 &&
              !context.location && (
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
                <Paragraph>
                  Sorry no events near you, please refine your search
                </Paragraph>
              )}
            <Grid>
              {context.data &&
                Object.keys(context.data).length !== 0 &&
                context.data.events.map(item => (
                  <Item key={item.id}>
                    {item.performers[0].image ? (
                      <EventImage
                        src={item.performers[0].image}
                        alt={item.title}
                      />
                    ) : (
                      <NoImage>No Image</NoImage>
                    )}
                    <Content>
                      <Paragraph>
                        🗓
                        {moment(item.datetime_local).format("dddd")},{" "}
                        {moment(item.datetime_local).format(
                          "MMMM Do YYYY, h:mma"
                        )}
                      </Paragraph>
                      <Paragraph>{item.title}</Paragraph>
                      <Paragraph>
                        {item.venue.name}, {item.venue.address},{" "}
                        {item.venue.display_location}
                      </Paragraph>
                      <button
                        onClick={() =>
                          context.user
                            ? alert("find buddy")
                            : context.setSignin(true)
                        }
                      >
                        Find buddy
                      </button>
                    </Content>
                  </Item>
                ))}
            </Grid>
            {context.data &&
              Object.keys(context.data).length !== 0 &&
              context.data.meta.total >= context.data.meta.per_page && (
                <Center>
                  <ButtonSecondary
                    onClick={() =>
                      context.setItemsPerPage(context.itemsPerPage + 25)
                    }
                  >
                    Load More
                  </ButtonSecondary>
                </Center>
              )}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default BrowseEvents;
