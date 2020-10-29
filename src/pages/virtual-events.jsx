import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import EventItem from "../library/events/event-item";
import { Container, Grid, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import { FirebaseContext } from "gatsby-plugin-firebase";
import EventItemLoader from "../library/loaders/event-item";
import GhostButton from "../library/buttons/ghost-button";
import styled from "styled-components";
import GoTop from "../components/go-to-top";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

const VirtualEvents = () => {
  const postNode = {
    title: `${config.siteTitle} | Virtual Events`,
    pagePath: "/virtual-events"
  };

  const context = useContext(myContext);

  const firebase = React.useContext(FirebaseContext);

  // let passedEvents = [];
  //
  // const today = new Date();

  // if (context.virtualEventData) {
  //   passedEvents = Object.keys(context.virtualEventData).map(i => {
  //     if (new Date(context.virtualEventData[i].datetime_local) < today) {
  //       return context.virtualEventData[i];
  //     }
  //   });
  // }

  //const passedEventsCount = passedEvents.map(i => i).filter(x => !!x).length;

  const [limit, setLimit] = useState(100);

  useEffect(() => {
    firebase &&
      firebase
        .database()
        .ref(`/events/`)
        .limitToFirst(limit)
        .on("value", snapshot => {
          if (snapshot && snapshot.exists()) {
            context.setVirtualEventData(snapshot.val());
          }
        });
  }, [firebase, limit]);

  const loadEvents = () => {
    if (context.virtualEventData) {
      const placeholder = [];
      Object.keys(context.virtualEventData).map(item => {
        let object = context.virtualEventData[item];
        object.firebaseId = item;
        placeholder.push(context.virtualEventData[item]);
      });
      return placeholder.map(item => (
        <EventItem key={item.firebaseId} item={item} isMyEventsPage={false} />
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
        <>
          <Banner img="moshpit" />
          <Container>
            <Main>
              <Heading title="Virtual Events" />
              {context.virtualEventData && <Grid>{loadEvents()}</Grid>}
              <div id="bottom" />
              {!context.virtualEventData && <EventItemLoader />}
              <Center>
                <GhostButton
                  title="Load More"
                  borderRadius={20}
                  onClick={() => {
                    setLimit(limit + 24);
                    window.location = "#bottom";
                  }}
                />
              </Center>
            </Main>
          </Container>
        </>
      </Layout>
      <GoTop />
    </>
  );
};

export default VirtualEvents;
