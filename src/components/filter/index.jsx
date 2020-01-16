import React, { useContext } from "react";
import AlgoliaPlaces from "algolia-places-react";
import styled from "styled-components";
import { GREY, SILVER, TUNDORA } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import SelectInput from "../../library/inputs/select";
import { myContext } from "../../context/provider";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { isMobile } from "react-device-detect";
import "react-datepicker/dist/react-datepicker.css";
import DateInput from "../../library/inputs/date-picker";
import Debounced from "../../library/inputs/debounced-input";
import Paragraph from "../../library/paragraph/paragraph";
import World from "../../assets/svgs/world.svg";

const Container = styled.div`
  margin: 25px 0 0 0;
  padding: 25px;
  // want to add sticky later
  position: ${isMobile ? "relative" : "relative"};
  top: 0;
  box-shadow: ${SILVER} 1px 1px 10px;
  border-radius: 4px;
  background: ${TUNDORA};
  z-index: 0;
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
  width: 25%;
  font-family: ${FONT_FAMILY};
  position: relative;
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
  width: 45%;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const StyledSelect = styled.div`
  width: 15%;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const StyledDate = styled.div`
  width: 15%;
  margin-right: 15px;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const NoticeTextStyle = {
  padding: 0,
  margin: "10px 0 0 0",
  display: "flex",
  justifyContent: "flex-end",
  color: GREY,
  fontSize: ".9rem"
};

const WorldIcon = styled(World)`
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  top: 15px;
  pointer-events: none;
  path {
    fill: ${SILVER};
  }
`;

const selectData = [
  { value: 25, name: "Close (25 Miles)" },
  { value: 50, name: "50 Miles" },
  { value: 100, name: "100 Miles" },
  { value: 150, name: "150 Miles" },
  { value: 300, name: "300 Miles" },
  { value: 500, name: "500 Miles" },
  { value: 1000, name: "1000 Miles" }
];

const Filter = () => {
  const context = useContext(myContext);

  const onClearClick = () => {
    context.setData({});
    context.setArtistName("");
    context.setForceSearch(true);
  };

  return (
    <>
      <Container>
        <InputContainer>
          <StyledTextInput>
            <Debounced
              onClear={() => onClearClick()}
              placeHolder="Enter artist / event / sports team..."
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
              <WorldIcon />
            </AlogilaContainer>
          ) : (
            <AlogilaContainer>
              <TextInput
                onClear={() => context.setLocation(false)}
                value={context.location && `${context.location.value}`}
              />
            </AlogilaContainer>
          )}
          <StyledDate>
            <DateInput placeHolder="Select Date" />
          </StyledDate>
          <StyledSelect>
            <SelectInput
              options={selectData}
              onChange={e => {
                context.setRadius(e.target.value);
              }}
            />
          </StyledSelect>
        </InputContainer>
      </Container>
      <Paragraph customStyle={NoticeTextStyle}>
        * Start typing to search
      </Paragraph>
    </>
  );
};

export default Filter;
