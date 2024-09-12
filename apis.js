const axios = require("axios");
const winston = require('winston');
require("dotenv").config();
const weatherApi = async (q, days) => {
  const options = {
    method: "GET",
    url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
    params: {
      q,
      days,
    },
    headers: {
      "x-rapidapi-key": 'b2beb3257dmsh4107fe954e99defp127ab0jsn7de75a1e6953',
      "x-rapidapi-host": 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    winston.error(error);
    return null;
  }
};

module.exports = {weatherApi};
