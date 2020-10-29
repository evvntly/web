import React from "react";
import { v4 as uuidv4 } from "uuid";
import { FirebaseContext } from "gatsby-plugin-firebase";
import { test } from "../data/data";

console.log(test.slice(0, 5));
const Import = () => {
  const firebase = React.useContext(FirebaseContext);
  const onImGoingClick = () => {
    const eventRef = firebase.database().ref(`/events`);
    test.map(j => {
      const item = {
        type: "virtual",
        id: uuidv4(),
        venue: {},
        datetime_tbd: false,
        performers: [
          {
            type: "",
            name: j.artistName,
            image: `data:image/jpg;base64, ${j.artistImage}`,
            id: "",
            images: {
              huge: `data:image/jpg;base64, ${j.artistImage}`
            },
            divisions: null,
            has_upcoming_events: true,
            primary: true,
            stats: {
              event_count: 87
            },
            taxonomies: [],
            image_attribution: "",
            url: "",
            score: 0,
            slug: j.artistName,
            home_venue_id: null,
            short_name: j.artistName,
            num_upcoming_events: 0,
            colors: null,
            image_license: "",
            popularity: 0,
            location: null
          }
        ],
        is_open: false,
        links: [],
        startTime: j.startTime,
        timezone: j.timezone,
        datetime_local: j.localStartTime,
        steam_end: j.streamEnd,
        time_tbd: false,
        short_title: j.artistName,
        visible_until_utc: "",
        stats: {},
        taxonomies: [],
        url: "",
        score: 0,
        announce_date: "",
        created_at: "",
        date_tbd: false,
        title: j.artistName,
        popularity: 0,
        description: "",
        status: "normal",
        access_method: null,
        event_promotion: null,
        announcements: {},
        conditional: false,
        enddatetime_utc: null,
        themes: [],
        domain_information: []
      };
      eventRef.push(item);
    });
  };
  return <div onClick={() => onImGoingClick()}>Hello</div>;
};

export default Import;
