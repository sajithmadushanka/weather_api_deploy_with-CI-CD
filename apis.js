const axios = require("axios");
const winston = require('winston');

// Remove dotenv in production
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

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
