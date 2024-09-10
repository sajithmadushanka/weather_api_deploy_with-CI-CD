const express = require('express');
const weatherApi = require('./apis');
const { filterCurrentWeather } = require('./filterCurrentWeather');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);
app.get('/temperature',async (req, res) => {
    const city = req.query.city;
    const days = req.query.days;
    console.log('city:', city);
    const temperatureRes =  await weatherApi(city, days)
    if (!temperatureRes) {
        res.status(404).send('City not found');
        return
    }
    // console.log(temperatureRes);
    const filterTemperature = filterCurrentWeather(temperatureRes);
    res.send(filterTemperature);

    }
);
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
    }
);