import React, { useContext, useEffect } from "react";
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

const VirtualEvents = () => {
  const postNode = {
    title: `${config.siteTitle} | Virtual Events`,
    pagePath: "/virtual-events"
  };
  const context = useContext(myContext);

  const firebase = React.useContext(FirebaseContext);

  useEffect(() => {
    firebase &&
      firebase
        .database()
        .ref(`/events/`)
        .limitToFirst(25)
        .on("value", snapshot => {
          if (snapshot && snapshot.exists()) {
            context.setVirtualEventData(snapshot.val());
          }
        });
  }, [firebase]);

  console.log(context.virtualEventData);

  const loadEvents = () => {
    console.log(context.virtualEventData, "hi");
    if (context.virtualEventData) {
      console.log("hi");
      const placeholder = [];
      Object.keys(context.virtualEventData).map(item => {
        let object = context.virtualEventData[item];
        object.firebaseId = item;
        placeholder.push(context.virtualEventData[item]);
      });
      return placeholder.map(item => (
        <EventItem
          key={item.firebaseId}
          item={item}
          isMyEventsPage={false}
          base64={true}
        />
      ));
    }
  };

  console.log(context.virtualEventData);

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
              {!context.virtualEventData && <EventItemLoader />}
            </Main>
          </Container>
        </>
      </Layout>
    </>
  );
};

export default VirtualEvents;
