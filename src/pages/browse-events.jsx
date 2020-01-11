import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import LayoutPage from "../components/layout/layout-page";
import { navigate } from "gatsby";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import Filter from "../components/filter";
import { FONT_FAMILY } from "../styles/typography";
import { BLACK } from "../styles/colors";
import { FirebaseContext } from "gatsby-plugin-firebase";

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
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 10px;
  order: 2;
  flex-grow: 1;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

const MoreButton = styled.div`
  cursor: pointer;
  height: 40px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: normal;
  border: 1px solid #f0bb48;
  border-radius: 20px;
  padding: 0 40px;
  color: #4e4e4e;
  background: transparent;
  width: max-content;
  :hover {
    background: #f0bb48;
    color: black;
  }
  @media (max-width: 769px) and (min-width: 320px) {
    margin: 10px 0;
  }
`;

const EventImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 150px;
  order: 1;
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
  order: 1;
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px;
  display: flex;
  order: 3;
`;

const ButtonPrimary = styled.button`
  font-family: ${FONT_FAMILY};
  font-size: 13px;
  cursor: pointer;
  font-weight: normal;
  border: 1px solid #f0bb48;
  border-radius: 4px;
  padding: 10px 0px;
  color: #f0bb48;
  background: transparent;
  width: 100%;
  :hover {
    background: #f0bb48;
    color: ${BLACK};
  }
`;

const ButtonSecondary = styled.button`
  font-family: ${FONT_FAMILY};
  margin-right: 10px;
  font-size: 13px;
  cursor: pointer;
  font-weight: normal;
  border: 1px solid #f0bb48;
  border-radius: 4px;
  padding: 10px 0px;
  color: ${BLACK};
  background: #f0bb48;
  width: 100%;
  :hover {
    background: transparent;
    color: #f0bb48;
  }
`;

const BrowseEvents = () => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);
  const lat = context.location && context.location.latlng.lat;
  const lon = context.location && context.location.latlng.lng;
  const [eventAttendingIds, seteventAttendingIds] = useState([]);

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

  useEffect(() => {
    if (context.eventData && context.eventData.events) {
      Object.keys(context.eventData.events).map(i => {
        seteventAttendingIds([
          ...eventAttendingIds,
          context.eventData.events[i].id
        ]);
      });
    }
  }, [context.eventData]);

  const onImGoingClick = item => {
    if (process.env.NODE_ENV === "production" && context.user) {
      window.analytics.track("user_going_event", {
        data: item,
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    if (context.user) {
      const eventRef = firebase.database().ref(`${context.user.uid}/events`);
      const eventItem = {
        ...item,
        notes: "",
        type: "going"
      };
      eventRef.push(eventItem);
      eventRef.on("value", snapshot => {});
    } else {
      context.setSignin(true);
    }
  };

  const onMaybeClick = item => {
    if (process.env.NODE_ENV === "production" && context.user) {
      window.analytics.track("user_maybe_event", {
        data: item,
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    if (context.user) {
      const eventRef = firebase.database().ref(`${context.user.uid}/events`);
      const eventItem = {
        ...item,
        notes: "",
        type: "maybe"
      };
      eventRef.push(eventItem);
      eventRef.on("value", snapshot => {});
    } else {
      context.setSignin(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Search Events</title>
        <link rel="canonical" href="https://eventfinda.io/browse-events" />
        <meta name="description" content="Browse Events" />
      </Helmet>
      <LayoutPage>
        <Banner img="basketballbanner" />
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
              <Paragraph>{`Showing you ${
                context.data.meta.total
              } events`}</Paragraph>
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
                    </Content>
                    <ButtonWrapper>
                      {eventAttendingIds.includes(item.id) ? (
                        <ButtonPrimary onClick={() => navigate("/my-events")}>
                          You're Attending! 🎉
                        </ButtonPrimary>
                      ) : (
                        <>
                          <ButtonSecondary onClick={() => onImGoingClick(item)}>
                            I'm Def Going!
                          </ButtonSecondary>
                          <ButtonPrimary onClick={() => onMaybeClick(item)}>
                            I'm Interested
                          </ButtonPrimary>
                        </>
                      )}
                    </ButtonWrapper>
                  </Item>
                ))}
            </Grid>
            {context.data &&
              Object.keys(context.data).length !== 0 &&
              context.data.meta.total >= context.data.meta.per_page && (
                <Center>
                  <MoreButton
                    onClick={() =>
                      context.setItemsPerPage(context.itemsPerPage + 25)
                    }
                  >
                    Load More
                  </MoreButton>
                </Center>
              )}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default BrowseEvents;
