import React from "react";
import { Grid } from "../../styles/shared";
import styled, { keyframes } from "styled-components";

const PlaceholderShimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
`;

export const Shimmer = styled.div`
  background: #f6f7f8;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  display: inline-block;
  position: relative;
  -webkit-animation-duration: 1s;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: ${PlaceholderShimmer};
  -webkit-animation-timing-function: linear;
`;

const EventItemLoader = () => {
  return (
    <Grid>
      <div style={{ height: "350px" }}>
        <Shimmer />
      </div>
      <div style={{ height: "350px" }}>
        <Shimmer />
      </div>
      <div style={{ height: "350px" }}>
        <Shimmer />
      </div>
      <div style={{ height: "350px" }}>
        <Shimmer />
      </div>
    </Grid>
  );
};

export default EventItemLoader;
