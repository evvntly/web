import React, { useContext } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import Paragraph from "../library/paragraph/paragraph";
import EventItem from "../library/events/event-item";
import { Container, Main } from "../styles/shared";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 769px) and (min-width: 320px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
`;

const MyEvents = () => {
  const context = useContext(myContext);

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
        <EventItem key={item.id} item={item} isMyEventsPage={true} />
      ));
    }
  };

  return (
    <>
      <Helmet>
        <title>My Saved Events</title>
      </Helmet>
      <Layout>
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
      </Layout>
    </>
  );
};

export default MyEvents;
