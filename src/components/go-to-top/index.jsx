import React, { useState } from "react";
import styled from "styled-components";
import { SILVER, TUNDORA } from "../../styles/colors";
import Chevron from "../../assets/svgs/up-arrow.svg";
import { useWindow } from "../../utils/useWindow";

const BackToTop = styled.div`
  height: 50px;
  width: 50px;
  background: ${SILVER};
  position: fixed;
  right: 0;
  bottom: 70px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media (max-width: 769px) and (min-width: 320px) {
    display: none;
  }
`;

const ChevronIcon = styled(Chevron)`
  width: 30px;
  height: 30px;
  opacity: 0.3;
  path {
    fill: ${TUNDORA};
  }
`;

const GoToTop = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  document.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  });

  console.log(showBackToTop);

  return (
    <>
      {showBackToTop && (
        <BackToTop onClick={() => useWindow && window.scrollTo(0, 0)}>
          <ChevronIcon />
        </BackToTop>
      )}
    </>
  );
};

export default GoToTop;
