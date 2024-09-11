const express = require('express');
const { weatherApi } = require('./apis');
const { filterCurrentWeather } = require('./utils/filterCurrentWeather');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/hello', (req, res)=>{
  res.send("Hello Mash!")
})
app.get('/temperature', async (req, res) => {
  const city = req.query.city;
  const days = req.query.days;

  try {
    const temperatureRes = await weatherApi(city, days);

    if (!temperatureRes) {
      res.status(404).send('City not found');
    } else {
      const filteredData = filterCurrentWeather(temperatureRes);
      res.status(200).json(filteredData);
    }
  } catch (error) {
    res.status(500).send('Error fetching temperature data');
  }
});

module.exports = app;
