import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { FONT_FAMILY } from "../../styles/typography";
import { BLACK, WHITE } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import { myContext } from "../../context/provider";
import { navigate } from "gatsby";
import PosterImage from "./poster";
import Button from "../../library/buttons/button";
import GhostButton from "../../library/buttons/ghost-button";

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
  margin: 25px 0;
  > button:first-of-type {
    margin: 0 15px 0 0;
  }
  @media (max-width: 769px) and (min-width: 320px) {
    flex-direction: column;
    > button:first-of-type {
      margin: 0 0 25px 0;
    }
    > button {
      width: 100%;
    }
  }
`;

const Video = () => {
  const context = useContext(myContext);
  const [image, setImage] = useState(false);

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
        .toLowerCase()}&range=25mi&per_page=25&geoip=true&client_id=${
        process.env.GATSBY_API_KEY
      }`
    )
      .then(response => response.json())
      .then(data => context.setData(data))
      .then(() => {
        navigate("/browse-events/");
        context.setRadius(50);
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

  const onSignupClick = () => {
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("signup_clicked", {
        position: "cta",
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    context.setSignin(true);
  };

  return (
    <div>
      <PosterImage img={image}>
        <Content>
          <h1>Looking for events near you or around the US?</h1>
          <h2>Stop searching and enjoying life!</h2>
          <Input>
            <TextInput
              onChange={e => {
                context.setArtistName(e.target.value);
              }}
              placeholder="Artist / Event / Sports team... e.g. Golden State Warriors"
            />
          </Input>
          <ButtonWrapper>
            <Button
              textColor={BLACK}
              height="50px"
              title="Find Events"
              borderRadius={4}
              onClick={() => onButtonClick()}
            />
            {!context.uesr && (
              <GhostButton
                textColor={BLACK}
                height="50px"
                title="Sign Up"
                borderRadius={4}
                onClick={() => onSignupClick()}
              />
            )}
          </ButtonWrapper>
        </Content>
      </PosterImage>
    </div>
  );
};

export default Video;
