import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { WEIGHT } from "../../styles/typography";

const Select = styled.select`
  width: 100%;
  height: 50px;
  -webkit-border-radius: 0;
  border: 0;
  outline: 1px solid grey;
  outline-offset: -1px;
  padding-left: 5px;
  background: white;
  font-size: 14px;
  font-weight: ${WEIGHT.THIN};
`;

const SelectInput = ({ options, onChange }) => {
  return (
    <Select onChange={onChange}>
      {options.map(item => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};

SelectInput.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func
};

export default SelectInput;
