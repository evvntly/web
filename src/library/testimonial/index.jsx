import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { WEIGHT, FONT_FAMILY } from "../../styles/typography";

const Content = styled.h1`
  font-size: 1.4rem;
  text-align: center;
  font-style: italic;
  padding: 0;
  max-width: 800px;
  margin: 20px auto 20px auto;
  color: ${props => (props.color ? props.color : "black")};
  font-weight: ${WEIGHT.THIN};
  font-family: ${FONT_FAMILY};
`;

const Image = styled.img`
  width: 85px;
  height: 85px;
  border-radius: 100px;
  margin-top: -50px;
  box-shadow: 0 0 4px #000;
`;

const Container = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const Name = styled.p`
  font-family: ${FONT_FAMILY};
  color: ${props => (props.color ? props.color : "black")};
`;

const Testimonial = ({ testimonial, color, name, image }) => {
  return (
    <>
      {image ? (
        <Container>
          <Image src={image} />
          <Content color={color}>{testimonial}</Content>
          <Name color={color}>{name}</Name>
        </Container>
      ) : (
        <Content color={color}>{testimonial}</Content>
      )}
    </>
  );
};

Testimonial.propTypes = {
  testimonial: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string
};

export default Testimonial;
