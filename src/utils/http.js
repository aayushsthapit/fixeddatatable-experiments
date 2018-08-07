const axios = require("axios");

export const getData = async () => {
  return axios
    .get("http://localhost:8848/api/todo")
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log("Error", err);
    });
};
