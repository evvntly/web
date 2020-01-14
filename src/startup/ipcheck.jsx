import { fetch as fetchPolyfill } from "whatwg-fetch";

export const ipCheck = setIplocation => {
  fetchPolyfill("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      setIplocation(data.country);
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};
