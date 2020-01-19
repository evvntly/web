import React, { useContext, useEffect, useState } from "react";
import fetchPonyfill from "fetch-ponyfill";
const { fetch } = fetchPonyfill();
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import { myContext } from "../context/provider";
import Filter from "../components/filter";
import EventItem from "../library/events/event-item";
import { Container, Grid, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import GhostButton from "../library/buttons/ghost-button";
import Notice from "../library/notice";
import { Link } from "gatsby";
import { useWindow } from "../utils/useWindow";

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
`;

const Wrapper = styled.div`
  margin: 120px auto 0 auto;
  @media (max-width: 769px) and (min-width: 320px) {
    margin: 80px auto 0 auto;
  }
`;

const BrowseEvents = () => {
  const postNode = {
    title: `${config.siteTitle} | Browse Events`,
    pagePath: "/browse-events"
  };

  const context = useContext(myContext);
  const lat = context.location && context.location.latlng.lat;
  const lon = context.location && context.location.latlng.lng;
  const [noticeSeen, setNoticeSeen] = useState(
    useWindow && window.localStorage.getItem("outside-us-notice")
  );

  useEffect(() => {
    context.setForceSearch(false);
    fetch(
      `https://api.seatgeek.com/2/events?q=${context.searchTerm
        .replace(/\s+/g, "-")
        .toLowerCase()}&range=${context.radius}mi&per_page=${
        context.itemsPerPage
      }&geoip=true${context.location ? `&lat=${lat}&lon=${lon}` : ""}${
        context.startDate ? `&datetime_utc.gt=${context.convertDate}` : ""
      }&client_id=${process.env.GATSBY_API_KEY}`
    )
      .then(response => response.json())
      .then(data => context.setData(data))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, [
    context.radius,
    context.itemsPerPage,
    context.location,
    context.forceSearch,
    context.startDate,
    context.searchTerm
  ]);

  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/browse-events" pageSEO />
      <Layout>
        <Container>
          <Wrapper>
            <Main>
              {!context.withinUs && !noticeSeen && (
                <Notice
                  icon
                  onDismiss={() => {
                    useWindow &&
                      window.localStorage.setItem("outside-us-notice", true);
                    setNoticeSeen(
                      useWindow &&
                        window.localStorage.getItem("outside-us-notice")
                    );
                  }}
                >
                  <div>
                    Hi! Results are limited outside the US.{" "}
                    <Link to="/outside-us" aria-label="Outside The USA">
                      Learn More
                    </Link>
                  </div>
                </Notice>
              )}

              <Heading title="Browse Events" />
              <Filter />
              {context.data && Object.keys(context.data).length === 0 && (
                <Paragraph>
                  Currently you have not searched for an event start looking for
                  your next event by using the filter above.
                </Paragraph>
              )}

              {context.data &&
                Object.keys(context.data).length !== 0 &&
                context.data.meta.total !== 0 && (
                  <Paragraph>{`Showing you ${context.data.meta.total} events`}</Paragraph>
                )}

              {context.data &&
                Object.keys(context.data).length !== 0 &&
                !context.location && (
                  <>
                    <Paragraph>
                      {`We are currently showing you events ${context.radius} miles around your
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
                    <EventItem key={item.id} item={item} />
                  ))}
              </Grid>
              {context.data &&
                Object.keys(context.data).length !== 0 &&
                context.data.meta.total >= context.data.meta.per_page && (
                  <Center>
                    <GhostButton
                      title="Load More"
                      borderRadius={20}
                      onClick={() =>
                        context.setItemsPerPage(context.itemsPerPage + 24)
                      }
                    />
                  </Center>
                )}
            </Main>
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};

export default BrowseEvents;
