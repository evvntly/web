import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import Paragraph from "../paragraph/paragraph";
import moment from "moment";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { FONT_FAMILY } from "../../styles/typography";
import { ALTO, BLACK, RONCHI, SILVER, WHITE } from "../../styles/colors";
import PropTypes from "prop-types";

const Item = styled.div`
  border: 1px solid ${SILVER};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Content = styled.div`
  padding: 10px;
  order: 2;
  flex-grow: 1;
`;

const EventImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 150px;
  order: 1;
`;

const NoImage = styled.div`
  width: 100%;
  height: 150px;
  background: ${SILVER};
  font-family: ${FONT_FAMILY};
  color: ${ALTO};
  display: flex;
  align-items: center;
  font-size: 20px;
  justify-content: center;
  order: 1;
`;

const ButtonWrapper = styled.div`
  padding: 10px 10px;
  display: flex;
  order: 2;
  margin-top: -55px;
`;

const ButtonPrimary = styled.button`
  font-family: ${FONT_FAMILY};
  font-size: 13px;
  cursor: pointer;
  font-weight: normal;
  border: 1px solid ${RONCHI};
  border-radius: 4px;
  padding: 5px 0px;
  color: ${BLACK};
  background: ${WHITE};
  width: 100%;
  :hover {
    background: ${RONCHI};
    color: ${BLACK};
  }
`;

const ButtonSecondary = styled.button`
  font-family: ${FONT_FAMILY};
  margin-right: 10px;
  font-size: 13px;
  cursor: pointer;
  font-weight: normal;
  border: 1px solid ${RONCHI};
  border-radius: 4px;
  padding: 5px 0px;
  color: ${BLACK};
  background: ${RONCHI};
  width: 100%;
  :hover {
    background: ${WHITE};
    color: ${BLACK};
  }
`;

const EventItem = ({ item, isMyEventsPage }) => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);
  const [eventAttendingIds, seteventAttendingIds] = useState([]);

  const TitleStyle = {
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "1.3rem"
  };

  useEffect(() => {
    if (context.eventData && context.eventData.events) {
      Object.keys(context.eventData.events).map(i => {
        seteventAttendingIds([
          ...eventAttendingIds,
          context.eventData.events[i].id
        ]);
      });
    }
  }, [context.eventData]);

  const onImGoingClick = item => {
    if (process.env.NODE_ENV === "production" && context.user) {
      window.analytics.track("user_going_event", {
        data: item,
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    if (context.user) {
      const eventRef = firebase.database().ref(`${context.user.uid}/events`);
      const eventItem = {
        ...item,
        notes: "",
        attending: "going"
      };
      eventRef.push(eventItem);
    } else {
      context.setSignin(true);
    }
  };

  const onMaybeClick = item => {
    if (process.env.NODE_ENV === "production" && context.user) {
      window.analytics.track("user_maybe_event", {
        data: item,
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }

    if (context.user) {
      const eventRef = firebase.database().ref(`${context.user.uid}/events`);
      const eventItem = {
        ...item,
        notes: "",
        attending: "maybe"
      };
      eventRef.push(eventItem);
    } else {
      context.setSignin(true);
    }
  };

  const removeEvent = (eventId, item) => {
    if (process.env.NODE_ENV === "production") {
      window.analytics.track("user_deleted_event", {
        data: item,
        path: window.location.pathname,
        url: typeof window !== "undefined" ? window.location.href : null,
        referrer: typeof document !== "undefined" ? document.referrer : null
      });
    }
    const eventRef = firebase
      .database()
      .ref(`${context.user.uid}/events/${eventId}`);
    eventRef.remove();
    if (Object.keys(context.eventData.events).length === 1) {
      navigate("/browse-events");
    }
  };

  const renderDate = item => {
    const eventDate = new Date(item.datetime_local);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    if (eventDate < nextWeek) {
      return (
        <Paragraph>
          {" "}
          <span role="img" aria-label="Calendar">
            🗓
          </span>{" "}
          {moment(eventDate).calendar()}
        </Paragraph>
      );
    } else {
      return (
        <Paragraph>
          <span role="img" aria-label="Calendar">
            🗓
          </span>{" "}
          {moment(eventDate).format("MMMM Do YYYY, h:mma")}
        </Paragraph>
      );
    }
  };

  return (
    <Item key={item.id}>
      {item.performers[0].image ? (
        <EventImage src={item.performers[0].image} alt={item.title} />
      ) : (
        <NoImage>No Image</NoImage>
      )}
      <ButtonWrapper>
        {isMyEventsPage && (
          <ButtonPrimary onClick={() => removeEvent(item.firebaseId, item)}>
            Remove Event{" "}
            <span role="img" aria-label="Man arms crossed">
              🙅‍♂️
            </span>
          </ButtonPrimary>
        )}
        {!isMyEventsPage && (
          <>
            {eventAttendingIds.includes(item.id) ? (
              <ButtonPrimary onClick={() => navigate("/my-events")}>
                You&apos;re Attending!{" "}
                <span role="img" aria-label="Party">
                  {" "}
                  🎉
                </span>
              </ButtonPrimary>
            ) : (
              <>
                <ButtonSecondary onClick={() => onImGoingClick(item)}>
                  <span role="img" aria-label="Thumbs Up">
                    👍🏾
                  </span>{" "}
                  Going
                </ButtonSecondary>
                <ButtonPrimary onClick={() => onMaybeClick(item)}>
                  <span role="img" aria-label="Shrug">
                    🤷🏻‍♀️{" "}
                  </span>
                  Interested
                </ButtonPrimary>
              </>
            )}
          </>
        )}
      </ButtonWrapper>
      <Content>
        {isMyEventsPage && (
          <>
            {item.attending === "going" ? (
              <Paragraph>I&apos;ll be there!</Paragraph>
            ) : (
              <Paragraph>Interested in going</Paragraph>
            )}
          </>
        )}
        <Paragraph customStyle={TitleStyle}>{item.title}</Paragraph>
        {renderDate(item)}
        <Paragraph>
          <strong>{item.venue.name}</strong> <br /> {item.venue.address},{" "}
          {item.venue.display_location}
        </Paragraph>
      </Content>
    </Item>
  );
};

EventItem.propTypes = {
  isMyEventsPage: PropTypes.bool,
  item: PropTypes.object
};

export default EventItem;
