const axios = require("axios");
const winston = require('winston');

  require("dotenv").config();

console.log("URL:", process.env.URL);
console.log("API_KEY:", process.env.API_KEY);
console.log("HOST:", process.env.HOST);

const weatherApi = async (q, days) => {
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
    winston.error(error);
    return null;
  }
};

module.exports = { weatherApi };
