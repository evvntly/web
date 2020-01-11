import React, { useContext } from "react";
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

const DeleteButton = styled.button`
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

const MyEvents = () => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);

  const removeEvent = (eventId, item) => {
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("user_deleted_event", {
        data: item,
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    const eventRef = firebase
      .database()
      .ref(`${context.user.uid}/events/${eventId}`);
    eventRef.remove();
    if (Object.keys(context.eventData.events).length === 1) {
      navigate("/browse-events");
    }
  };

  const loadEvents = () => {
    if (context.eventData.events) {
      const placeholder = [];
      Object.keys(context.eventData.events).map(item => {
        let object = context.eventData.events[item];
        object.firebaseId = item;
        placeholder.push(context.eventData.events[item]);
      });
      const sortedEvents = placeholder.sort(function(a, b) {
        return new Date(a.datetime_local) - new Date(b.datetime_local);
      });

      return sortedEvents.map(item => (
        <Item key={item.firebaseId}>
          {item.performers[0].image ? (
            <EventImage src={item.performers[0].image} alt={item.title} />
          ) : (
            <NoImage>No Image</NoImage>
          )}
          <Content>
            {item.type === "going" ? (
              <Paragraph>I'll be there!</Paragraph>
            ) : (
              <Paragraph>Interested in going</Paragraph>
            )}
            <Paragraph>
              🗓
              {moment(item.datetime_local).format("dddd")},{" "}
              {moment(item.datetime_local).format("MMMM Do YYYY, h:mma")}
            </Paragraph>
            <Paragraph>{item.title}</Paragraph>
            <Paragraph>
              {item.venue.name}, {item.venue.address},{" "}
              {item.venue.display_location}
            </Paragraph>
            <DeleteButton onClick={() => removeEvent(item.firebaseId, item)}>
              Delete Event
            </DeleteButton>
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
            {context.eventData.events && <Grid>{loadEvents()}</Grid>}
            {!context.eventData.events && (
              <Paragraph>No events added yet, try to add some</Paragraph>
            )}
          </Main>
        </Container>
      </LayoutPage>
    </>
  );
};

export default MyEvents;
