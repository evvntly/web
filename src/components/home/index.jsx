import React, { useContext, useEffect, useState } from "react";
import fetchPonyfill from "fetch-ponyfill";
const { fetch } = fetchPonyfill();
import styled from "styled-components";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { BLACK, SILVER, WHITE } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import { myContext } from "../../context/provider";
import { navigate } from "gatsby";
import PosterImage from "./poster";
import Button from "../../library/buttons/button";
import AlgoliaPlaces from "algolia-places-react";
import Heading from "../../library/headings/heading";

const Input = styled.div`
  margin-top: 30px;
  display: flex;
  @media (max-width: 769px) and (min-width: 320px) {
    flex-direction: column;
  }
`;

const Test = styled.div`
  margin-top: 30px;
  display: flex;
  @media (max-width: 769px) and (min-width: 320px) {
    flex-direction: column;
  }
`;

const test2 = "";

const Title = styled.p`
  color: ${SILVER};
  font-family: ${FONT_FAMILY};
  padding: 0;
  text-align: left;
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: ${WEIGHT.NORMAL};
`;

const AlogilaContainer = styled.div`
  margin-left: 20px;
  width: 35%;
  font-family: ${FONT_FAMILY};
  color: ${BLACK};
  button {
    display: none;
  }
  input {
    height: 45px;
    border-radius: 0;
    font-size: 16px;
    font-weight: ${WEIGHT.THIN};
  }
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0 0 0;
  }
`;

const Content = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 800px;
  min-width: 700px;
  transform: translate(-50%, -50%);
  font-family: ${FONT_FAMILY};
  color: ${WHITE};
  @media (max-width: 769px) and (min-width: 320px) {
    min-width: 90%;
  }
  h1 {
    padding: 0;
    font-weight: bold;
    font-size: 35px;
    margin: 0 auto 30px auto;
    line-height: 45px;
    text-align: center;
    @media (max-width: 769px) and (min-width: 320px) {
      font-size: 30px;
      line-height: 35px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
  @media (max-width: 769px) and (min-width: 320px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
`;

const Video = () => {
  const context = useContext(myContext);
  const [image, setImage] = useState(false);
  const lat = context.location && context.location.latlng.lat;
  const lon = context.location && context.location.latlng.lng;

  useEffect(() => {
    const images = [
      "basketballhome",
      "moshpithome",
      "hockeyhome",
      "hockey2home",
      "footballhome",
      "baseballhome",
      "theatrehome",
      "basketballhome"
    ];
    setImage(images[Math.floor(Math.random() * images.length)]);
  }, []);

  const onButtonClick = () => {
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
      .then(() => {
        navigate("/browse-events/");
        context.setRadius(25);
        context.setStartDate(false);
        if (process.env.NODE_ENV === "production") {
          window.analytics.track("get_search_term", {
            searchTerm: context.artistName,
            path: window.location.pathname,
            url: typeof window !== "undefined" ? window.location.href : null,
            referrer: typeof document !== "undefined" ? document.referrer : null
          });
        }
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  return (
    <>
      <PosterImage img={image}>
        <Content>
          <Heading
            color={WHITE}
            title="Start enjoying life by finding the perfect event near you."
          />
          <Input>
            <TextInput
              title="Artist / Event / Sport / Team"
              onChange={e => {
                context.setArtistName(e.target.value);
              }}
              placeholder="E.G. Golden State Warriors"
            />
            {!context.location ? (
              <AlogilaContainer>
                <Title>Where</Title>
                <AlgoliaPlaces
                  placeholder="E.G. New York"
                  options={{
                    appId: process.env.GATSBY_ALGOLIA_APP_ID,
                    apiKey: process.env.GATSBY_ALGOLIA_API
                  }}
                  onChange={({ suggestion }) => context.setLocation(suggestion)}
                  onClear={() => context.setLocation(false)}
                  onError={({ message }) =>
                    // eslint-disable-next-line no-console
                    console.log(message)
                  }
                />
              </AlogilaContainer>
            ) : (
              <AlogilaContainer>
                <TextInput
                  title="Where"
                  onClear={() => context.setLocation(false)}
                  value={context.location && `${context.location.value}`}
                />
              </AlogilaContainer>
            )}
          </Input>
          <ButtonWrapper>
            <Button
              textColor={BLACK}
              height="50px"
              title="Find Events"
              borderRadius={4}
              onClick={() => onButtonClick()}
            />
          </ButtonWrapper>
          <a
            href="https://www.producthunt.com/posts/event-finda?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-event-finda"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=180841&theme=dark"
              alt="Event Finda - Find events near you, and all around the world. | Product Hunt Embed"
              style={{ width: "250px", height: "54px" }}
              width="250px"
              height="54px"
            />
          </a>
        </Content>
      </PosterImage>
    </>
  );
};

export default Video;
