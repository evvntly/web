import fetchPonyfill from "fetch-ponyfill";
const { fetch } = fetchPonyfill();

export const ipCheck = setIplocation => {
  fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => {
      setIplocation(data.country);
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};
