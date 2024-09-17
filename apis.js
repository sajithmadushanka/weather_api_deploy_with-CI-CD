const axios = require("axios");
const winston = require("winston");

require("dotenv").config();

const weatherApi = async (q, days) => {
  console.log("URL:", process.env.URL);
  console.log("API_KEY:", process.env.API_KEY);
  console.log("HOST:", process.env.HOST);
  console.log("project id", process.env.GCP_PROJECT_ID);

  const options = {
    method: "GET",
    url: process.env.URL,
    params: { q, days },
    headers: {
      "x-rapidapi-key": process.env.API_KEY,
      "x-rapidapi-host": process.env.HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    winston.error(error);
    return null;
  }
};

module.exports = { weatherApi };
