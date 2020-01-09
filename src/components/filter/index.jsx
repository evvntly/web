import React, { useContext } from "react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import SelectInput from "../../library/inputs/select";
import { myContext } from "../../context/provider";
import { FONT_FAMILY } from "../../styles/typography";

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
  height: 48px;
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

const StyledTextInput = styled.div`
  margin-right: 25px;
  width: 80%;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const StyledSelect = styled.div`
  width: 20%;
  margin-right: 25px;
  @media (max-width: 769px) and (min-width: 320px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const selectData = [
  { value: 50, name: "Near Me (50 Miles)" },
  { value: 100, name: "100 Miles" },
  { value: 250, name: "250 Miles" },
  { value: 500, name: "500 Miles" },
  { value: 2500, name: "2500 Miles" },
  { value: 10000, name: "Entire USA" }
];

const Filter = () => {
  const context = useContext(myContext);
  const onButtonClick = () => {
    fetch(
      `https://api.seatgeek.com/2/events?q=${context.artistName
        .replace(/\s+/g, "-")
        .toLowerCase()}&range=${context.radius}mi&per_page=${
        context.itemsPerPage
      }&geoip=true&client_id=${process.env.GATSBY_API_KEY}`
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
        <StyledSelect>
          <SelectInput
            options={selectData}
            onChange={e => {
              context.setRadius(e.target.value);
            }}
          />
        </StyledSelect>
        <ButtonSecondary onClick={() => onButtonClick()}>
          Search
        </ButtonSecondary>
      </InputContainer>
    </Container>
  );
};

export default Filter;
