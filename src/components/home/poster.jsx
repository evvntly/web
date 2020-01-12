import React from "react";
import { graphql, StaticQuery } from "gatsby";
import styled from "styled-components";
import BackgroundImage from "gatsby-background-image";
import { isMobile } from "react-device-detect";
import PropTypes from "prop-types";

const PosterImage = ({ className, img }) => (
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
      // eslint-disable-next-line
      data.allFile.edges.map(file => {
        if (file.node.name === img) {
          imageData = file.node.childImageSharp.fluid;
        }
      });
      return (
        <>
          <BackgroundImage fluid={imageData} className={className} />
        </>
      );
    }}
  />
);

PosterImage.propTypes = {
  className: PropTypes.string,
  img: PropTypes.any
};

const StyledPosterImage = styled(PosterImage)`
  position: absolute;
  width: 100vw;
  height: 100vh;
  margin-top: ${isMobile ? "-50px" : "-70px"};
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export default StyledPosterImage;
