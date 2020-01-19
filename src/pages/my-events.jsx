import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import Paragraph from "../library/paragraph/paragraph";
import EventItem from "../library/events/event-item";
import { Container, Grid, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import Notice from "../library/notice";
import { useWindow } from "../utils/useWindow";
import { Link } from "gatsby";

const MyEvents = () => {
  const postNode = {
    title: `${config.siteTitle} | My Events`,
    pagePath: "/my-events"
  };
  const [noticeSeen, setNoticeSeen] = useState(
    useWindow &&
      window.localStorage.getItem("my-events-deleted-after-date-notice")
  );
  const [loading, setLoading] = useState(false);
  const context = useContext(myContext);

  useEffect(() => {
    context.setIsAuthPage(true);
  }, []);

  useEffect(() => {
    if (context.eventData.events) {
      setLoading(false);
    }
  }, [context.eventData.events]);

  console.log(loading);

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
                {context.eventData.events && !noticeSeen && (
                  <Notice
                    onDismiss={() => {
                      useWindow &&
                        window.localStorage.setItem(
                          "my-events-deleted-after-date-notice",
                          true
                        );
                      setNoticeSeen(
                        useWindow &&
                          window.localStorage.getItem(
                            "my-events-deleted-after-date-notice"
                          )
                      );
                    }}
                  >
                    * Please note, events in the past will automatically be
                    removed.
                  </Notice>
                )}
                {context.eventData.events && <Grid>{loadEvents()}</Grid>}
                {!context.eventData.events && (
                  <>
                    <Paragraph>You&apos;ve not added any events yet!</Paragraph>
                    <Paragraph>
                      <Link to="/browse-events" aria-label="Advertise">
                        Browse Events
                      </Link>
                    </Paragraph>
                  </>
                )}
              </Main>
            </Container>
          </>
        )}
      </Layout>
    </>
  );
};

export default MyEvents;
