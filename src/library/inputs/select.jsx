import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SILVER } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const Title = styled.p`
  color: ${SILVER};
  font-family: ${FONT_FAMILY};
  padding: 0;
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: ${WEIGHT.THIN};
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: 1px solid #cccccc;
  border-radius: 0;
  padding-left: 5px;
  background: white;
  font-size: 12px;
  font-weight: ${WEIGHT.THIN};
`;

const SelectInput = ({ options, onChange }) => {
  return (
    <Select onChange={onChange}>
      {options.map(item => (
        <>
          <option value={item.value}>{item.name}</option>
        </>
      ))}
    </Select>
  );
};

SelectInput.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default SelectInput;
