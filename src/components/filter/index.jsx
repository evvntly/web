import React, { useContext } from "react";
import AlgoliaPlaces from "algolia-places-react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import SelectInput from "../../library/inputs/select";
import { myContext } from "../../context/provider";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";

const Container = styled.div`
  margin: 25px 0;
  padding: 25px 35px;
  background: #4a4a4a;
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

const ButtonSecondary = styled.div`
  cursor: pointer;
  height: 40px;
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FONT_FAMILY};
  font-weight: normal;
  border: 2px solid #f0bb48;
  padding: 0 40px;
  color: ${BLACK};
  background: #f0bb48;
  :hover {
    background: transparent;
    color: #f0bb48;
  }
  @media (max-width: 769px) and (min-width: 320px) {
    margin: 10px 0;
  }
`;

const AlogilaContainer = styled.div`
  margin-right: 20px;
  width: 30%;
  font-family: ${FONT_FAMILY};
  input {
    height: 50px;
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
  { value: 50, name: "Close (50 Miles)" },
  { value: 100, name: "100 Miles" },
  { value: 250, name: "250 Miles" },
  { value: 500, name: "500 Miles" },
  { value: 2500, name: "2500 Miles" },
  { value: 10000, name: "Entire USA" }
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
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  };
  const onClearClick = () => {
    context.setData({});
    context.setArtistName("");
  };

  console.log(context);

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
                apiKey: process.env.GATSBY_ALGOLIA_API,
                countries: ["us"]
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
        <ButtonSecondary onClick={() => onButtonClick()}>
          Search
        </ButtonSecondary>
      </StyledButton>
    </Container>
  );
};

export default Filter;
