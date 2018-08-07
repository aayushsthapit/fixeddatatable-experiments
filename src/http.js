const axios = require("axios");

export const getData = () => {
  axios.get("http://localhost:8848/api/todo").then(response => {
    console.log("RESPONSE", response);
  });
};
