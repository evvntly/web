import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SILVER, RED, BLACK } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const InputWrapper = styled.div`
  width: 100%;
`;

const Input = styled.textarea`
  border: ${props =>
    props.error ? `1px solid ${RED}` : `1px solid ${SILVER}`};
  font-family: ${FONT_FAMILY};
  padding: 10px 10px;
  font-size: 14px;
  font-weight: ${WEIGHT.THIN};
  min-height: 100px;
  box-sizing: border-box;
  width: 100%;
`;

const Title = styled.p`
  color: ${BLACK};
  font-family: ${FONT_FAMILY};
  padding: 0;
  text-align: left;
  margin: 0 0 5px 0;
  font-size: 16px;
  font-weight: ${WEIGHT.THIN};
`;

const Error = styled.p`
  color: ${RED};
  font-family: ${FONT_FAMILY};
  padding: 0;
  margin: 5px 0 0 0;
  font-size: 14px;
  font-weight: ${WEIGHT.THIN};
`;

const TextArea = ({
  title,
  placeholder,
  error,
  type,
  name,
  required,
  onFocus,
  onChange
}) => {
  return (
    <InputWrapper>
      {title && <Title>{title}</Title>}
      <Input
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        required={required}
        error={!!error}
        onFocus={onFocus}
      />
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

TextArea.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  required: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

export default TextArea;
