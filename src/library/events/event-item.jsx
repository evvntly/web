// @flow
import React, { useContext, useState } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import Paragraph from "../paragraph/paragraph";
import moment from "moment";
import { myContext } from "../../context/provider";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { FONT_FAMILY } from "../../styles/typography";
import {
  ALTO,
  BLACK,
  LA_PALMA,
  RED,
  RONCHI,
  SILVER,
  WHITE
} from "../../styles/colors";
import Trash from "../../assets/svgs/bin.svg";
import Tick from "../../assets/svgs/tick.svg";
import Star from "../../assets/svgs/star.svg";
import Tada from "../../assets/svgs/tada.svg";
import Notes from "../../assets/svgs/notes.svg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import NotesModal from "../../components/my-events/notes-modal";

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

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotesIcon = styled(Notes)`
  width: 20px;
  height: 20px;
  padding: 0 5px 0 0;
  opacity: 0.5;
  cursor: pointer;
  background: ${WHITE};
  path {
    fill: ${BLACK};
  }
`;

const UserSettings = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const PerformerName = styled.span`
  cursor: pointer;
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
  box-sizing: border-box;
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
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  z-index: 1;
  opacity: ${props => (props.past ? 0.5 : 1)};
  pointer-events: ${props => (props.past ? "none" : "all")};
  filter: ${props => (props.past ? "grayscale(100%)" : "none")};
`;

const Content = styled.div`
  padding: 10px 15px;
  order: 2;
  flex-grow: 1;
  margin-bottom: 25px;
`;

const Pill = styled.div`
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

const EventImage = styled.div`
  img {
    object-fit: cover;
    width: 100%;
    height: 150px;
    order: 1;
  }
`;

const SingleImage = styled.img`
  margin-bottom: -9px;
  object-fit: cover;
  width: 100%;
  height: 150px;
  order: 1;
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

const ButtonAttending = styled.button`
  font-family: ${FONT_FAMILY};
  font-size: 13px;
  font-weight: normal;
  border: 1px solid ${LA_PALMA};
  padding: 3px 0px;
  color: ${WHITE};
  background: ${LA_PALMA};
  width: 100%;
  svg path {
    fill: ${WHITE};
  }
`;

const truncate = (input, length) =>
  input.length > length ? `${input.substring(0, length)}...` : input;

const EventItem = ({
  item,
  isMyEventsPage
}: {
  isMyEventsPage: boolean,
  item: {
    datetime_local: string,
    performers: Array<Content>,
    id: number,
    name: string,
    firebaseId: number,
    attending: string,
    venue: { display_location: string, name: string, address: string },
    title: string,
    type: string,
    notes: string
  }
}) => {
  const context = useContext(myContext);
  const firebase = React.useContext(FirebaseContext);
  const [showNotesModal, setShowNotesModal] = useState(false);

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
          .ref(`/users/${context.user.uid}/events/${item.firebaseId}`);
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
      const eventRef = firebase
        .database()
        .ref(`/users/${context.user.uid}/events`);
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
      const eventRef = firebase
        .database()
        .ref(`/users/${context.user.uid}/events`);
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
      .ref(`/users/${context.user.uid}/events/${eventId}`);
    eventRef.remove();
    if (Object.keys(context.eventData.events).length === 1) {
      navigate("/browse-events");
    }
  };

  const onUpdateToGoingClick = firebaseId => {
    firebase
      .database()
      .ref(`/users/${context.user.uid}/events/${firebaseId}`)
      .update({ attending: "going" });
  };

  const onUpdateToMaybeClick = firebaseId => {
    firebase
      .database()
      .ref(`/users/${context.user.uid}/events/${firebaseId}`)
      .update({ attending: "maybe" });
  };

  const onPerformerClick = item => {
    window.scrollTo(0, 0);
    context.setsearchTerm(item.name);
    context.setForceSearch(true);
    if (isMyEventsPage) {
      navigate("/browse-events");
    }
  };

  const daysRemaining = item => {
    const eventDate = moment(item.datetime_local);
    const todaysDate = moment();
    return <Pill>{`${eventDate.diff(todaysDate, "days")} days away`}</Pill>;
  };

  const renderDate = item => {
    const eventDate = new Date(item.datetime_local);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 1.5 * 24 * 60 * 60 * 1000);
    if (eventDate < nextWeek) {
      return (
        <Pill>
          {
            moment(eventDate)
              .calendar()
              .split(" ")[0]
          }
        </Pill>
      );
    } else if (isMyEventsPage) {
      return daysRemaining(item);
    }
  };

  let eventAttendingIds = [];

  if (context.eventData && context.eventData.events) {
    eventAttendingIds = Object.keys(context.eventData.events).map(i => {
      return context.eventData.events[i].id;
    });
  }

  const images = item.performers.map(i => i.image).filter(x => !!x);

  return (
    <>
      <Item key={item.id} past={new Date(item.datetime_local) < today}>
        {changeToPastEvent(item)}

        {images.length === 1 && (
          <>
            {images.map((i, index) => (
              <SingleImage key={index} src={i} alt={item.name} />
            ))}
          </>
        )}

        {images.length > 1 && (
          <>
            <Carousel
              showArrows={true}
              showThumbs={false}
              showStatus={true}
              infiniteLoop={true}
              showIndicators={!isMyEventsPage}
            >
              {images.map((i, index) => (
                <EventImage key={index}>
                  <img src={i} alt={item.name} />
                </EventImage>
              ))}
            </Carousel>
          </>
        )}

        {images.length === 0 && (
          <>
            <NoImage>No Image</NoImage>
          </>
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
          {!isMyEventsPage && new Date(item.datetime_local) > today && (
            <>
              {eventAttendingIds.includes(item.id) ? (
                <ButtonAttending onClick={() => navigate("/my-events")}>
                  <TadaIcon />
                  You&apos;re Attending!
                </ButtonAttending>
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
        {!isMyEventsPage && new Date(item.datetime_local) < today && (
          <ButtonSecondary>Passed Event</ButtonSecondary>
        )}
        <Content>
          <Paragraph customStyle={HeadingStyle}>
            {item.venue.display_location}
          </Paragraph>
          <Paragraph customStyle={TitleStyle}>
            {truncate(item.title, 34)}
          </Paragraph>
          {item.type === "concert" && item.performers.length > 1 && (
            <div>
              <Paragraph customStyle={HeadingStyle}>
                Performing Artists:
              </Paragraph>
              <Paragraph
                customStyle={{
                  margin: "5px 0 0 0",
                  lineHeight: "1rem",
                  fontSize: "0.9rem"
                }}
              >
                {item.performers.map((i, index) => {
                  const lastItem = item.performers.length === index + 1;
                  if (lastItem) {
                    return (
                      <PerformerName
                        onClick={() => onPerformerClick(i)}
                      >{`& ${i.name}.`}</PerformerName>
                    );
                  } else {
                    return (
                      <PerformerName
                        key={i.id}
                        onClick={() => onPerformerClick(i)}
                      >{`${i.name}, `}</PerformerName>
                    );
                  }
                })}
              </Paragraph>
            </div>
          )}
          <DateWrapper>
            <div>
              <Paragraph customStyle={HeadingStyle}>Date</Paragraph>
              <Paragraph customStyle={{ fontSize: "1rem", margin: "0 0 0 0" }}>
                {moment(item.datetime_local).format("dddd MMMM Do YYYY")}
              </Paragraph>
            </div>
            <div>
              <Paragraph customStyle={HeadingStyle}>Time</Paragraph>
              <Paragraph customStyle={{ fontSize: "1rem", margin: "0 0 0 0" }}>
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
            <NotesIcon onClick={() => setShowNotesModal(true)} title="Notes" />
            <TrashIcon
              title="Delete Event"
              onClick={() => removeEvent(item.firebaseId, item)}
            />
          </UserSettings>
        )}
      </Item>
      {showNotesModal && (
        <NotesModal onDismiss={() => setShowNotesModal(false)} item={item} />
      )}
    </>
  );
};

export default EventItem;
