import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import Paragraph from "../library/paragraph/paragraph";
import EventItem from "../library/events/event-item";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import { RED } from "../styles/colors";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 769px) and (min-width: 320px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
`;

const MyEvents = () => {
  const postNode = {
    title: `${config.siteTitle} | My Events`,
    pagePath: "/my-events"
  };

  const context = useContext(myContext);

  useEffect(() => {
    context.setIsAuthPage(true);
  }, []);

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
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/my-events" loggedInPage />
      <Layout>
        {context.isAuthPage && context.user && (
          <>
            <Banner img="moshpit" />
            <Container>
              <Main>
                <Heading title="My Saved Events" />
                {context.eventData.events && <Grid>{loadEvents()}</Grid>}
                {!context.eventData.events && (
                  <Paragraph>No events added yet, try to add some</Paragraph>
                )}
                <Paragraph customStyle={{ fontSize: ".9rem", color: RED }}>
                  * Please note, events in the past will automatically be
                  removed.
                </Paragraph>
              </Main>
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

export default MyEvents;
