import "whatwg-fetch";
import { useWindow } from "../utils/useWindow";

export const ipCheck = setIplocation => {
  useWindow &&
    fetch("https://ipapi.co/json/")
      .then(response => response.json())
      .then(data => {
        setIplocation(data.country);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
};
