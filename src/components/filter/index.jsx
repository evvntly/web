import React, { useContext } from "react";
import fetchPonyfill from "fetch-ponyfill";
const { fetch } = fetchPonyfill();
import AlgoliaPlaces from "algolia-places-react";
import styled from "styled-components";
import { BLACK, SILVER, TUNDORA } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import SelectInput from "../../library/inputs/select";
import { myContext } from "../../context/provider";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import GhostButton from "../../library/buttons/ghost-button";
import { isMobile } from "react-device-detect";

const Container = styled.div`
  margin: 25px 0;
  padding: 25px 35px;
  box-shadow: ${SILVER} 1px 1px 10px;
  border-radius: 4px;
  background: ${TUNDORA};
  @media (max-width: 769px) and (min-width: 320px) {
    padding: 10px 20px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  @media (max-width: 769px) and (min-width: 320px) {
    flex-direction: column;
  }
`;

const AlogilaContainer = styled.div`
  margin-right: 20px;
  width: 30%;
  font-family: ${FONT_FAMILY};
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
    margin: 10px 0;
  }
`;

const StyledTextInput = styled.div`
  margin-right: 20px;
  width: 50%;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const StyledButton = styled.div`
  margin-top: 15px;
  @media (max-width: 769px) and (min-width: 320px) {
    margin: 6px 0 8px 0;
  }
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
`;

const StyledSelect = styled.div`
  width: 20%;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const selectData = [
  { value: 25, name: "Close (25 Miles)" },
  { value: 50, name: "50 Miles" },
  { value: 100, name: "100 Miles" },
  { value: 250, name: "250 Miles" },
  { value: 500, name: "500 Miles" },
  { value: 2500, name: "25,00 Miles" },
  { value: 10000, name: "10,000 miles" },
  { value: 1000000000, name: "The Whole World! 🌎" }
];

const Filter = () => {
  const context = useContext(myContext);
  const lat = context.location && context.location.latlng.lat;
  const lon = context.location && context.location.latlng.lng;

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
  const onClearClick = () => {
    context.setData({});
    context.setArtistName("");
  };

  return (
    <Container>
      <InputContainer>
        <StyledTextInput>
          <TextInput
            onClear={() => onClearClick()}
            value={context.artistName ? context.artistName : ""}
            onChange={e => {
              context.setArtistName(e.target.value);
            }}
            placeholder="Enter artist / event / sports team..."
          />
        </StyledTextInput>
        {!context.location ? (
          <AlogilaContainer>
            <AlgoliaPlaces
              placeholder="Locations, e.g. New York"
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
              onClear={() => context.setLocation(false)}
              value={context.location && `${context.location.value}`}
            />
          </AlogilaContainer>
        )}
        <StyledSelect>
          <SelectInput
            options={selectData}
            onChange={e => {
              context.setRadius(e.target.value);
            }}
          />
        </StyledSelect>
      </InputContainer>
      <StyledButton>
        <GhostButton
          width={isMobile ? "100%" : "19%"}
          title="Search"
          textColor={BLACK}
          height="45px"
          borderRadius={4}
          onClick={() => onButtonClick()}
        />
      </StyledButton>
    </Container>
  );
};

export default Filter;
