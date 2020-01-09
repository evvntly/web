import React, { useContext } from "react";
import styled from "styled-components";
import { BLACK } from "../../styles/colors";
import TextInput from "../../library/inputs/text";
import SelectInput from "../../library/inputs/select";
import { myContext } from "../../context/provider";

const Container = styled.div`
  margin: 25px 0;
  padding: 25px 35px;
  background: #4a4a4a;
`;

const ButtonSecondary = styled.div`
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

const selectData = [
  { value: 50, name: "50 Miles" },
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
    context.setRadius(50);
    context.setArtistName("");
  };

  return (
    <Container>
      <TextInput
        value={context.artistName ? context.artistName : ""}
        onChange={e => {
          context.setArtistName(e.target.value);
        }}
        placeholder="Enter artist / event / sports team..."
      />
      <SelectInput
        options={selectData}
        onChange={e => {
          context.setRadius(e.target.value);
        }}
      />
      <ButtonSecondary onClick={() => onButtonClick()}>Search</ButtonSecondary>
      <ButtonPrimary onClick={() => onClearClick()}>Clear All</ButtonPrimary>
    </Container>
  );
};

export default Filter;
