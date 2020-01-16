import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FONT_FAMILY, WEIGHT } from "../../styles/typography";
import DatePicker from "react-datepicker";
import { myContext } from "../../context/provider";
import { SILVER } from "../../styles/colors";
import Calendar from "../../assets/svgs/calendar.svg";

const Input = styled.div`
  position: relative;
  .react-datepicker-wrapper {
    display: block;
  }
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
  right: 12px;
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

const CalendarIcon = styled(Calendar)`
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

const DateInput = ({ placeHolder }) => {
  const context = useContext(myContext);
  const today = new Date();
  return (
    <Input>
      <DatePicker
        placeholderText={placeHolder}
        selected={context.startDate}
        onChange={date => context.setStartDate(date)}
        minDate={today}
      />
      {!context.startDate && <CalendarIcon />}
      {context.startDate && (
        <Clear onClick={() => context.setStartDate(false)} />
      )}
    </Input>
  );
};

DateInput.propTypes = {
  placeHolder: PropTypes.string
};

export default DateInput;
