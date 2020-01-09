import React, { useContext } from "react";
import styled from "styled-components";
import { FONT_FAMILY } from "../../styles/typography";
import { BLACK, WHITE } from "../../styles/colors";
import PosterImage from "./poster";
import TextInput from "../../library/inputs/text";
import { myContext } from "../../context/provider";
import { navigate } from "gatsby";

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  overflow: hidden;
`;

const Overlay = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${BLACK};
  opacity: 0.4;
`;

const Input = styled.div`
  margin-top: 30px;
`;

const Content = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  max-width: 600px;
  transform: translate(-50%, -50%);
  font-family: ${FONT_FAMILY};
  color: ${WHITE};
  h1 {
    padding: 0;
    font-weight: bold;
    font-size: 40px;
    max-width: 700px;
    margin: 0 auto 30px auto;
    line-height: 50px;
    @media (max-width: 769px) and (min-width: 320px) {
      font-size: 20px;
      line-height: 25px;
    }
  }
  h2 {
    margin: 0 auto;
    padding: 0;
    font-weight: lighter;
    font-size: 25px;
    max-width: 650px;
    text-align: center;
    @media (max-width: 769px) and (min-width: 320px) {
      font-size: 15px;
    }
  }
`;

const ButtonSecondary = styled.div`
  cursor: pointer;
  font-weight: normal;
  border-radius: 4px;
  margin-left: 20px;
  @media (max-width: 769px) and (min-width: 320px) {
    margin-left: 0;
    margin-top: 25px;
  }
  border: 2px solid #006ebc;
  padding: 10px 40px;
  margin-top: 50px;
  display: inline-block;
  color: ${WHITE};
  background: #006ebc;
  :hover {
    background: transparent;
    color: #006ebc;
  }
`;

const Video = () => {
  const context = useContext(myContext);
  console.log(context);
  const onButtonClick = () => {
    fetch(
      `https://api.seatgeek.com/2/events?q=${context.artistName
        .replace(/\s+/g, "-")
        .toLowerCase()}&range=50mi&per_page=25&geoip=true&client_id=${
        process.env.GATSBY_API_KEY
      }`
    )
      .then(response => response.json())
      .then(data => context.setData(data))
      .then(() => navigate("/find-buddy/"))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };

  const videos = [
    "https://media.istockphoto.com/videos/slomo-of-a-football-being-caught-by-receiver-video-id871040454",
    "https://media.istockphoto.com/videos/stage-diving-video-id670497036",
    "https://media.istockphoto.com/videos/park-at-night-establishing-shot-video-id1160668031",
    "https://media.istockphoto.com/videos/the-puck-flies-to-gate-video-id483261099",
    "https://media.istockphoto.com/videos/future-nba-champion-video-id636326226"
  ];
  const selectRandomVideo = videos[Math.floor(Math.random() * videos.length)];

  return (
    <>
      <PosterImage>
        <BackgroundVideo autoPlay playsInline muted loop>
          <source src={selectRandomVideo} type="video/mp4" />
        </BackgroundVideo>
      </PosterImage>
      <Overlay />
      <Content>
        <h1>Looking for a event / gig / sports game buddy?</h1>
        <h2>Stop searching and start connecting!</h2>
        <Input>
          <TextInput
            onChange={e => {
              context.setArtistName(e.target.value);
            }}
            placeholder="Enter artist / event / sports team..."
          />
        </Input>
        <ButtonSecondary onClick={() => onButtonClick()}>
          Find your buddy
        </ButtonSecondary>
      </Content>
    </>
  );
};

export default Video;
