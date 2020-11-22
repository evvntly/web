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
import { Clear } from "../library/inputs/debounced-input";
import { DebounceInput } from "react-debounce-input";
import { SILVER } from "../styles/colors";
import { FONT_FAMILY, WEIGHT } from "../styles/typography";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

export const Input = styled.div`
  position: relative;
  input {
    border: 1px solid ${SILVER};
    position: relative;
    font-family: ${FONT_FAMILY};
    padding: 0 30px 0 10px;
    height: 45px;
    font-size: 16px;
    border-radius: 0;
    font-weight: ${WEIGHT.THIN};
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 25px;
  }
`;

const VirtualEvents = () => {
  const postNode = {
    title: `${config.siteTitle} | Virtual Events`,
    pagePath: "/virtual-events"
  };

  const context = useContext(myContext);

  const firebase = React.useContext(FirebaseContext);

  const [limit, setLimit] = useState(52);
  const [artistName, setArtistName] = useState("");

  const debouncedSearchTerm = useDebounce(artistName, 500);

  const changeToPastVirtualEvent = item => {
    if (context.virtualEventData && context.virtualEventData) {
      const eventDate = new Date(item.datetime_local);
      const today = new Date();
      if (eventDate < today) {
        const eventRef = firebase.database().ref(`/events/${item.firebaseId}`);
        eventRef.remove();
      }
    }
  };

  useEffect(() => {
    if (artistName) {
      firebase &&
        firebase
          .database()
          .ref(`/events/`)
          .orderByChild("title")
          .equalTo(artistName)
          .on("value", snapshot => {
            if (snapshot) {
              context.setVirtualEventData(snapshot.val());
            }
          });
    } else {
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
    }
  }, [firebase, limit, debouncedSearchTerm]);

  const loadEvents = () => {
    if (context.virtualEventData) {
      const placeholder = [];
      Object.keys(context.virtualEventData).map(item => {
        let object = context.virtualEventData[item];
        object.firebaseId = item;
        placeholder.push(context.virtualEventData[item]);
      });
      return placeholder.map(item => {
        changeToPastVirtualEvent(item);
        return (
          <EventItem key={item.firebaseId} item={item} isMyEventsPage={false} />
        );
      });
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
              <Input>
                <DebounceInput
                  placeholder="Search Band or Artist"
                  debounceTimeout={400}
                  value={artistName}
                  onChange={e => setArtistName(e.target.value)}
                />
                {artistName && <Clear onClick={() => setArtistName("")} />}
              </Input>
              {context.virtualEventData && <Grid>{loadEvents()}</Grid>}
              <div id="bottom" />
              {!context.virtualEventData && !artistName && <EventItemLoader />}
              {!context.virtualEventData && artistName && (
                <div>Sorry no results</div>
              )}
              {context.virtualEventData && !artistName && (
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
              )}
            </Main>
          </Container>
        </>
      </Layout>
      <GoTop />
    </>
  );
};

export default VirtualEvents;
