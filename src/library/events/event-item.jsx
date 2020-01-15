import React, { useContext } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import Paragraph from "../paragraph/paragraph";
import moment from "moment";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { FONT_FAMILY } from "../../styles/typography";
import { ALTO, BLACK, RED, RONCHI, SILVER, WHITE } from "../../styles/colors";
import PropTypes from "prop-types";
import Trash from "../../assets/svgs/bin.svg";
// import Notes from "../../assets/svgs/notes.svg";
import Tick from "../../assets/svgs/tick.svg";
import Star from "../../assets/svgs/star.svg";
import Tada from "../../assets/svgs/tada.svg";

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TrashIcon = styled(Trash)`
  width: 20px;
  height: 20px;
  padding: 0 0 0 5px;
  opacity: 0.5;
  cursor: pointer;
  background: ${WHITE};
  path {
    fill: ${RED};
  }
`;

// const NotesIcon = styled(Notes)`
//   width: 20px;
//   height: 20px;
//   opacity: 0.5;
//   padding: 0 5px 0 5px;
//   cursor: pointer;
//   path {
//     fill: ${GREY};
//   }
// `;

const UserSettings = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
  order: 4;
`;

const AttendingSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  top: 90px;
  position: absolute;
  width: 100%;
  opacity: 0.9;
`;

const TickHeaderIcon = styled(Tick)`
  width: 20px;
  height: 20px;
  padding: 10px;
  cursor: pointer;
  background: ${props => (props.isFill ? RONCHI : WHITE)};
  border-radius: 50px;
  margin-right: 7px;
  border: ${props =>
    props.isFill ? `1px solid ${RONCHI}` : `1px solid ${BLACK}`};
  path {
    fill: ${BLACK};
  }
  &:hover {
    background: ${RONCHI};
  }
`;

const StarHeaderIcon = styled(Star)`
  width: 20px;
  height: 20px;
  padding: 10px;
  cursor: pointer;
  background: ${props => (props.isFill ? RONCHI : WHITE)};
  border-radius: 50px;
  border: ${props =>
    props.isFill ? `1px solid ${RONCHI}` : `1px solid ${BLACK}`};
  path {
    fill: ${BLACK};
  }
  &:hover {
    background: ${RONCHI};
  }
`;

const TickIcon = styled(Tick)`
  width: 12px;
  height: 12px;
  margin-right: 7px;
  path {
    fill: ${BLACK};
  }
`;

const StarIcon = styled(Star)`
  width: 12px;
  height: 12px;
  margin-right: 7px;
  path {
    fill: ${BLACK};
  }
`;

const TadaIcon = styled(Tada)`
  width: 12px;
  height: 12px;
  margin-right: 7px;
  path {
    fill: ${BLACK};
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
`;

const Item = styled.div`
  border: 1px solid ${SILVER};
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`;

const Content = styled.div`
  padding: 10px 15px;
  order: 2;
  flex-grow: 1;
`;

const TodayOrTomorrow = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 10px;
  padding: 3px 10px;
  font-size: 12px;
  color: ${BLACK};
  background: ${RONCHI};
  opacity: 0.8;
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
  display: flex;
  order: 2;
  @media (max-width: 769px) and (min-width: 320px) {
    margin-top: -2px;
  }
`;

const ButtonPrimary = styled.button`
  font-family: ${FONT_FAMILY};
  font-size: 13px;
  cursor: pointer;
  font-weight: normal;
  border: 1px solid ${RONCHI};
  padding: 3px 0px;
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
  font-size: 13px;
  cursor: pointer;
  font-weight: normal;
  border: 1px solid ${RONCHI};
  padding: 3px 0px;
  color: ${BLACK};
  background: ${RONCHI};
  width: 100%;
  :hover {
    background: ${WHITE};
    color: ${BLACK};
  }
`;

const truncate = (input, length) =>
  input.length > length ? `${input.substring(0, length)}...` : input;

const EventItem = ({ item, isMyEventsPage }) => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);

  const TitleStyle = {
    fontWeight: "bold",
    fontSize: "1.1rem",
    lineHeight: "1.2rem",
    margin: "5px 0 0 0"
  };

  const HeadingStyle = {
    fontSize: "0.9rem",
    margin: "10px 0 0 0",
    lineHeight: "1rem",
    letterSpacing: "1px",
    fontWeight: 400
  };

  const today = new Date();

  const changeToPastEvent = item => {
    if (context.eventData && context.eventData.events) {
      const eventDate = new Date(item.datetime_local);
      const today = new Date();
      if (eventDate < today) {
        const eventRef = firebase
          .database()
          .ref(`${context.user.uid}/events/${item.firebaseId}`);
        eventRef.remove();
      }
    }
  };

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

  const onUpdateToGoingClick = firebaseId => {
    firebase
      .database()
      .ref(`${context.user.uid}/events/${firebaseId}`)
      .update({ attending: "going" });
  };

  const onUpdateToMaybeClick = firebaseId => {
    firebase
      .database()
      .ref(`${context.user.uid}/events/${firebaseId}`)
      .update({ attending: "maybe" });
  };

  const renderDate = item => {
    const eventDate = new Date(item.datetime_local);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 1.5 * 24 * 60 * 60 * 1000);
    if (eventDate < nextWeek) {
      return <TodayOrTomorrow>{moment(eventDate).calendar()}</TodayOrTomorrow>;
    }
  };

  let eventAttendingIds = [];

  if (context.eventData && context.eventData.events) {
    eventAttendingIds = Object.keys(context.eventData.events).map(i => {
      return context.eventData.events[i].id;
    });
  }

  return (
    <>
      {new Date(item.datetime_local) > today && (
        <Item key={item.id}>
          {changeToPastEvent(item)}
          {item.performers[0].image ? (
            <EventImage src={item.performers[0].image} alt={item.title} />
          ) : (
            <NoImage>No Image</NoImage>
          )}
          {renderDate(item)}
          {isMyEventsPage && (
            <AttendingSettings>
              <TickHeaderIcon
                onClick={() => onUpdateToGoingClick(item.firebaseId)}
                isFill={item.attending === "going"}
              />
              <StarHeaderIcon
                onClick={() => onUpdateToMaybeClick(item.firebaseId)}
                isFill={item.attending === "maybe"}
              />
            </AttendingSettings>
          )}
          <ButtonWrapper>
            {!isMyEventsPage && (
              <>
                {eventAttendingIds.includes(item.id) ? (
                  <ButtonSecondary onClick={() => navigate("/my-events")}>
                    <TadaIcon />
                    You&apos;re Attending!
                  </ButtonSecondary>
                ) : (
                  <>
                    <ButtonSecondary onClick={() => onImGoingClick(item)}>
                      <ButtonWrap>
                        <TickIcon />
                        Attend
                      </ButtonWrap>
                    </ButtonSecondary>
                    <ButtonPrimary onClick={() => onMaybeClick(item)}>
                      <StarIcon />
                      Interested
                    </ButtonPrimary>
                  </>
                )}
              </>
            )}
          </ButtonWrapper>
          <Content>
            <Paragraph customStyle={HeadingStyle}>
              {item.venue.display_location}
            </Paragraph>
            <Paragraph customStyle={TitleStyle}>
              {truncate(item.title, 34)}
            </Paragraph>
            <DateWrapper>
              <div>
                <Paragraph customStyle={HeadingStyle}>Date</Paragraph>
                <Paragraph
                  customStyle={{ fontSize: "1rem", margin: "0 0 0 0" }}
                >
                  {moment(item.datetime_local).format("MMMM Do YYYY")}
                </Paragraph>
              </div>
              <div>
                <Paragraph customStyle={HeadingStyle}>Time</Paragraph>
                <Paragraph
                  customStyle={{ fontSize: "1rem", margin: "0 0 0 0" }}
                >
                  {moment(item.datetime_local).format("LT")}
                </Paragraph>
              </div>
            </DateWrapper>
            <Paragraph customStyle={HeadingStyle}>Location</Paragraph>
            <Paragraph customStyle={TitleStyle}>{item.venue.name}</Paragraph>
            <Paragraph customStyle={{ fontSize: "1rem", margin: "5px 0 0 0" }}>
              {item.venue.address}, {item.venue.display_location}
            </Paragraph>
          </Content>
          {isMyEventsPage && (
            <UserSettings>
              {/*<NotesIcon title="Add / View Notes" />*/}
              <TrashIcon
                title="Delete Event"
                onClick={() => removeEvent(item.firebaseId, item)}
              />
            </UserSettings>
          )}
        </Item>
      )}
    </>
  );
};

EventItem.propTypes = {
  isMyEventsPage: PropTypes.bool,
  item: PropTypes.object
};

export default EventItem;
