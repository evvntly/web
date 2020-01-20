import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import BackgroundImage from "gatsby-background-image";
import { BLACK, WHITE } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";
import PropTypes from "prop-types";
import { PHONE } from "../../styles/breakpoints";

const Title = styled.h2`
  color: ${WHITE};
  padding: 0;
  margin: 0;
  font-size: 25px;
  ${PHONE} {
    font-size: 20px;
  }
  position: relative;
  z-index: 1;
  font-family: ${FONT_FAMILY};
  text-align: center;
`;

const Overlay = styled.div`
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${BLACK};
  opacity: 0.4;
  z-index: -1;
`;

const BackgroundSection = ({
  className,
  img,
  height = 290,
  title,
  overlay = true
}) => (
  <StaticQuery
    query={graphql`
      {
        allFile {
          edges {
            node {
              name
              childImageSharp {
                fluid(quality: 90, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      let imageData = {};
      data.allFile.edges.map(file => {
        if (file.node.name === img) {
          imageData = file.node.childImageSharp.fluid;
        }
      });
      return (
        <>
          <BackgroundImage
            style={{ height: height }}
            fluid={imageData}
            Tag="section"
            className={className}
          >
            {title && <Title>{title}</Title>}
            {overlay && <Overlay />}
          </BackgroundImage>
        </>
      );
    }}
  />
);

BackgroundSection.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string,
  height: PropTypes.number,
  title: PropTypes.string,
  overlay: PropTypes.bool
};

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  ${PHONE} {
    height: 175px !important; // override inline
  }
`;

export default StyledBackgroundSection;
