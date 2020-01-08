import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { SILVER, RED } from "../../styles/colors";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const InputWrapper = styled.div`
  width: 100%;
`;

const Input = styled.input`
  border: ${props =>
    props.error ? `1px solid ${RED}` : `1px solid ${SILVER}`};
  font-family: ${FONT_FAMILY};
  padding: 10px 10px;
  font-size: 16px;
  font-weight: ${WEIGHT.THIN};
  width: 100%;
  box-sizing: border-box;
`;

const Title = styled.p`
  color: ${SILVER};
  font-family: ${FONT_FAMILY};
  padding: 0;
  margin: 0 0 10px 0;
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

const TextInput = ({
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
        onFocus={onFocus}
        type={type}
        placeholder={placeholder}
        required={required}
        name={name}
        error={error ? true : false}
      />
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
  onFocus: PropTypes.func,
  onChange: PropTypes.func
};

export default TextInput;
