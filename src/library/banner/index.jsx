import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import BackgroundImage from "gatsby-background-image";
import { BLACK, WHITE } from "../../styles/colors";
import { FONT_FAMILY } from "../../styles/typography";

const Title = styled.h2`
  color: ${WHITE};
  padding: 0;
  margin: 0;
  font-size: 25px;
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
`;

const BackgroundSection = ({
  className,
  img,
  height = 370,
  title,
  overlay = false
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
                  base64
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      let imageData = {};
      // eslint-disable-next-line
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
            overlayColor="#000"
            backgroundColor={"#000"}
          >
            {title && <Title>{title}</Title>}
            {overlay && <Overlay />}
          </BackgroundImage>
        </>
      );
    }}
  />
);

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 769px) and (min-width: 320px) {
    height: 175px !important; // override inline
  }
`;

export default StyledBackgroundSection;
