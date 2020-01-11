import React, { useContext, useEffect, useState } from "react";
import LayoutPage from "../components/layout/layout-page";
import Heading from "../library/headings/Heading";
import { Helmet } from "react-helmet";
import { navigate } from "gatsby";
import styled from "styled-components";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import Paragraph from "../library/paragraph/paragraph";
import moment from "moment";
import { FONT_FAMILY } from "../styles/typography";

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

const MyEvents = () => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);
  const [eventData, setEventData] = useState(false);

  useEffect(() => {
    firebase &&
      firebase
        .database()
        .ref(`${context.user.uid}`)
        .on("value", snapshot => {
          if (snapshot && snapshot.exists()) {
            setEventData(snapshot.val());
          }
        });
  }, [firebase]);

  const removeEvent = eventId => {
    const eventRef = firebase
      .database()
      .ref(`${context.user.uid}/events/${eventId}`);
    eventRef.remove();
    if (Object.keys(eventData.events).length === 1) {
      console.log("last one");
      navigate("/browse-events");
    }
  };

  const loadEvents = () => {
    if (eventData.events) {
      return Object.keys(eventData.events).map(item => (
        <Item key={item}>
          {eventData.events[item].performers[0].image ? (
            <EventImage
              src={eventData.events[item].performers[0].image}
              alt={eventData.events[item].title}
            />
          ) : (
            <NoImage>No Image</NoImage>
          )}
          <Content>
            <Paragraph>
              🗓
              {moment(eventData.events[item].datetime_local).format(
                "dddd"
              )},{" "}
              {moment(eventData.events[item].datetime_local).format(
                "MMMM Do YYYY, h:mma"
              )}
            </Paragraph>
            <Paragraph>{eventData.events[item].title}</Paragraph>
            <Paragraph>
              {eventData.events[item].venue.name},{" "}
              {eventData.events[item].venue.address},{" "}
              {eventData.events[item].venue.display_location}
            </Paragraph>
            <button onClick={() => removeEvent(item)}>delete</button>
            {eventData.events[item].type === "going" ? (
              <div>Def Going!</div>
            ) : (
              <div>Interested in going</div>
            )}
            <div />
          </Content>
        </Item>
      ));
    }
  };

  return (
    <>
      <Helmet>
        <title>My Saved Events</title>
      </Helmet>
      <LayoutPage>
        <Banner img="moshpit" />
        <Container>
          <Main>
            <Heading title="My Saved Events" />
            {eventData.events && <Grid>{loadEvents()}</Grid>}
            {!eventData.events && (
              <Paragraph>No events added yet, try to add some</Paragraph>
            )}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default MyEvents;
