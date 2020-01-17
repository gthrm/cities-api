import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import https from 'https';

import http from 'http';
import path from 'path';
import fs from 'fs';

const rawCitiesJson = fs.readFileSync(path.join(__dirname, '../etc/cities_fixed.json'));
const citiesFixed = JSON.parse(rawCitiesJson);
const rawDistrictsJson = fs.readFileSync(path.join(__dirname, '../etc/districts.json'));
const districts = JSON.parse(rawDistrictsJson);
const rawRegionsJson = fs.readFileSync(path.join(__dirname, '../etc/regions.json'));
const regions = JSON.parse(rawRegionsJson);
const updateCities = citiesFixed.map((city) => ({
  ...city,
  regions: regions.find((region) => region.id === city.region_id),
  districts: districts.find((district) => district.id === city.district_id),
}));
const linkCities = citiesFixed.map((city) => ({
  ...city,
  regions: `/regions/${city.region_id}`,
  districts: `/districts/${city.district_id}`,
}));
const serverPort = 8080;
const app = express();

// const options = {
//   key: fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/25mbcloud.ml', 'privkey.pem')),
//   cert: fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/25mbcloud.ml', 'fullchain.pem')),
// };

app.use(bodyParser.json());
app.use(cors({origin: '*'}));

/**
 * GET fullcities
 * 127.0.0.1:9785/fullcities?name=москва
 * PARAMS
 * name
 */
app.get('/fullcities', (req, res) => {
  let newCities = updateCities;
  if (req.query.name && req.query.name.length > 0) {
    newCities = updateCities.filter((item) => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }
  res.send(newCities || []);
});

/**
 * GET fullcities/:id
 * 127.0.0.1:9785/cities/1
 */
app.get('/fullcities/:id', (req, res) => {
  const newCities = updateCities.filter((item) => String(item.id) === req.params.id);
  res.send(newCities || []);
});

/**
 * GET linkcities
 * 127.0.0.1:9785/linkcities?name=москва
 * PARAMS
 * name
 */
app.get('/linkcities', (req, res) => {
  let newCities = linkCities;
  if (req.query.name && req.query.name.length > 0) {
    newCities = linkCities.filter((item) => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }
  res.send(newCities || []);
});

/**
 * GET cities
 * 127.0.0.1:9785/cities?name=москва
 * PARAMS
 * name
 */
app.get('/cities', (req, res) => {
  let newCities = citiesFixed;
  if (req.query.name && req.query.name.length > 0) {
    newCities = citiesFixed.filter((item) => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }
  res.send(newCities || []);
});


/**
 * GET cities/:id
 * 127.0.0.1:9785/cities/1
 */
app.get('/cities/:id', (req, res) => {
  const newCities = citiesFixed.filter((item) => String(item.id) === req.params.id);
  res.send(newCities || []);
});

/**
 * GET districts
 * 127.0.0.1:9785/cities?name=Центральный федеральный округ
 * PARAMS
 * name
 */
app.get('/districts', (req, res) => {
  let newDistricts = districts;
  if (req.query.name && req.query.name.length > 0) {
    newDistricts = districts.filter((item) => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }
  res.send(newDistricts || []);
});

/**
 * GET districts/:id
 * 127.0.0.1:9785/districts/1
 */
app.get('/districts/:id', (req, res) => {
  const newDistricts = districts.filter((item) => String(item.id) === req.params.id);
  res.send(newDistricts || []);
});

/**
 * GET regions
 * 127.0.0.1:9785/regions?name=Центральный федеральный округ
 * PARAMS
 * name
 */
app.get('/regions', (req, res) => {
  let newRegions = regions;
  if (req.query.name && req.query.name.length > 0) {
    newRegions = regions.filter((item) => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }
  res.send(newRegions || []);
});

/**
 * GET regions/:id
 * 127.0.0.1:9785/regions/1
 */
app.get('/regions/:id', (req, res) => {
  const newRegions = regions.filter((item) => String(item.id) === req.params.id);
  res.send(newRegions || []);
});

/**
 * GET *
 * 127.0.0.1:9785/*
 */
app.use('*', (req, res) => {
  res.status(404);
  if (req.accepts('json')) {
    res.send({error: 'Not found'});
    return;
  }
  res.send('Not found');
});

// https.createServer(options, app).listen(serverPort, function () {
//     console.log(`Express server listening on port ${serverPort}`);
// });
http.createServer(app).listen(serverPort, function() {
  console.log(`Express server listening on port ${serverPort}`);
});
