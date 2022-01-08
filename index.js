const { request } = require('express');
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config(); // adding environmental variables usage

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

// new endpoint for different request
app.get('/weather/:latlon', async (request, response) => {
// console.log(request.params);
const latlon = request.params.latlon.split(',');
const lat = latlon[0];
const lon = latlon[1];
// console.log(latlon);
API_key = process.env.API_KEY;
const weather_url = `http://api.weatherapi.com/v1/current.json?key=833ed4123fe24ed28bd01821212212&q=${lat},${lon}&aqi=no`;
const weather_response = await fetch(weather_url);
const weather_data = await weather_response.json(); // i can add another api callback by copying these three lines
// const data = {
//   weather: weather_data,
//   air_quality: aq_data
// }
// response.json(data); // then i put both apis in an object and load it to response to client
response.json(weather_data);
});