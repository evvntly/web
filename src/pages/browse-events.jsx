import React, { useContext, useEffect } from "react";
import Layout from "../components/layout/layout";
import Heading from "../library/headings/heading";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Paragraph from "../library/paragraph/paragraph";
import Banner from "../library/banner";
import { myContext } from "../context/provider";
import Filter from "../components/filter";
import { FONT_FAMILY } from "../styles/typography";
import EventItem from "../library/events/event-item";
import { BLACK, RONCHI, TUNDORA } from "../styles/colors";
import { Container, Main } from "../styles/shared";
import config from "../utils/siteConfig";
import Seo from "../components/seo/seo";
import GhostButton from "../library/buttons/ghost-button";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 769px) and (min-width: 320px) {
    grid-template-columns: 1fr;
  }
  grid-gap: 20px;
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
  border: 1px solid ${RONCHI};
  border-radius: 20px;
  padding: 0 40px;
  color: ${TUNDORA};
  background: transparent;
  width: max-content;
  :hover {
    background: ${RONCHI};
    color: ${BLACK};
  }
  @media (max-width: 769px) and (min-width: 320px) {
    margin: 10px 0;
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

  return (
    <>
      <Helmet>
        <title>{postNode.title}</title>
      </Helmet>
      <Seo postNode={postNode} pagePath="/browse-events" pageSEO />
      <Layout>
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
                      context.setItemsPerPage(context.itemsPerPage + 25)
                    }
                  />
                </Center>
              )}
          </Main>
        </Container>
      </Layout>
    </>
  );
};

export default BrowseEvents;
