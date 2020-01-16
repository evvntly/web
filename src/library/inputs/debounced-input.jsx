import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import { myContext } from "../../context/provider";
import { SILVER } from "../../styles/colors";

const Input = styled.div`
  position: relative;
  input {
    border: 1px solid ${SILVER};
    position: relative;
    font-family: ${FONT_FAMILY};
    padding: 0 30px 0 10px;
    height: 45px;
    font-size: 16px;
    border-radius: 0;
    font-weight: ${WEIGHT.THIN};
    width: 100%;
    box-sizing: border-box;
  }
`;

const Clear = styled.div`
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 20px;
  height: 45px;
  &:before,
  &:after {
    position: absolute;
    left: 15px;
    content: " ";
    height: 15px;
    width: 2px;
    background-color: ${SILVER};
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`;

const Debounced = ({ onClear, placeHolder }) => {
  const context = useContext(myContext);
  return (
    <Input>
      <DebounceInput
        placeHolder={placeHolder}
        minLength={2}
        debounceTimeout={400}
        value={context.artistName ? context.artistName : ""}
        onChange={e => context.setArtistName(e.target.value)}
      />
      {context.artistName && <Clear onClick={onClear} />}
    </Input>
  );
};

Debounced.propTypes = {
  placeHolder: PropTypes.string,
  onClear: PropTypes.func
};

export default Debounced;
