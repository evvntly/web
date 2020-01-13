import React from "react";
import styled from "styled-components";
import Icon from "../../assets/svgs/user-report.svg";
import { BLACK } from "../../styles/colors";

const Container = styled.div`
  position: fixed;
  bottom: 10px;
  right: 0;
  background: ${BLACK};
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UserReportIcon = styled(Icon)`
  width: 40px;
  height: 40px;
`;

const UserReport = () => {
  const onUserReportClick = () => {
    if (process.env.NODE_ENV === "production") {
      window._urq.push(["Feedback_Open"]);
      window.analytics.track("userreport_clicked", {
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
  };

  return (
    <Container onClick={() => onUserReportClick()}>
      <UserReportIcon />
    </Container>
  );
};

export default UserReport;
