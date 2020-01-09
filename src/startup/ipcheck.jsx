export const ipCheck = setIplocation => {
  fetch("http://ip-api.com/json/")
    .then(response => response.json())
    .then(data => {
      if (data.status && data.status === "success")
        setIplocation(data.countryCode);
    })
    // eslint-disable-next-line no-console
    .catch(err => console.log(err));
};
