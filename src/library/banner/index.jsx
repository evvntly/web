import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import BackgroundImage from "gatsby-background-image";

const BackgroundSection = ({ className, img }) => (
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
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                  presentationWidth
                  presentationHeight
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
        <BackgroundImage
          fluid={imageData}
          Tag="section"
          className={className}
          backgroundColor={"#cccccc"}
        />
      );
    }}
  />
);

const StyledBackgroundSection = styled(BackgroundSection)`
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 370px;
  @media (max-width: 769px) and (min-width: 320px) {
    height: 250px;
  }
`;

export default StyledBackgroundSection;
