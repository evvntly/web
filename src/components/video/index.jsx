import React, { useContext } from "react";
import styled from "styled-components";
import { FONT_FAMILY } from "../../styles/typography";
import { BLACK, WHITE } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import { myContext } from "../../context/provider";
import { navigate } from "gatsby";

const BackgroundVideo = styled.video`
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
`;

const Overlay = styled.div`
  text-align: center;
  position: absolute;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  background: ${BLACK};
  opacity: 0.5;
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
  @media (max-width: 769px) and (min-width: 320px) {
    width: 90%;
  }
  h1 {
    padding: 0;
    font-weight: bold;
    font-size: 40px;
    max-width: 700px;
    margin: 0 auto 30px auto;
    line-height: 50px;
    @media (max-width: 769px) and (min-width: 320px) {
      font-size: 30px;
      line-height: 35px;
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
      font-size: 20px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 769px) and (min-width: 320px) {
    flex-direction: column;
  }
`;

const ButtonPrimary = styled.div`
  cursor: pointer;
  font-weight: normal;
  border-radius: 4px;
  border: 2px solid #f0bb48;
  padding: 10px 40px;
  margin-top: 30px;
  color: #f0bb48;
  background: transparent;
  :hover {
    background: #f0bb48;
    color: ${BLACK};
  }
`;

const ButtonSecondary = styled.div`
  margin-right: 20px;
  @media (max-width: 769px) and (min-width: 320px) {
    margin-right: 0;
  }
  cursor: pointer;
  font-weight: normal;
  border-radius: 4px;
  border: 2px solid #f0bb48;
  padding: 10px 40px;
  margin-top: 30px;
  color: ${BLACK};
  background: #f0bb48;
  :hover {
    background: transparent;
    color: #f0bb48;
  }
`;

const Video = () => {
  const context = useContext(myContext);
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
      .then(() => {
        navigate("/browse-events/");
        context.setRadius(50);
      })
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
      <BackgroundVideo autoPlay playsInline muted loop>
        <source src={selectRandomVideo} type="video/mp4" />
      </BackgroundVideo>
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
        <ButtonWrapper>
          <ButtonSecondary onClick={() => onButtonClick()}>
            Find your buddy
          </ButtonSecondary>
          {!context.user && (
            <ButtonPrimary onClick={() => context.setSignin(true)}>
              Signup!
            </ButtonPrimary>
          )}
        </ButtonWrapper>
      </Content>
    </>
  );
};

export default Video;
