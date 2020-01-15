"use strict";

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const rawCitiesJson = _fs.default.readFileSync(_path.default.join(__dirname, '../etc/cities_fixed.json'));

const citiesFixed = JSON.parse(rawCitiesJson);

const rawDistrictsJson = _fs.default.readFileSync(_path.default.join(__dirname, '../etc/districts.json'));

const districts = JSON.parse(rawDistrictsJson);

const rawRegionsJson = _fs.default.readFileSync(_path.default.join(__dirname, '../etc/regions.json'));

const regions = JSON.parse(rawRegionsJson);
const updateCities = citiesFixed.map(city => _objectSpread({}, city, {
  regions: regions.find(region => region.id === city.region_id),
  districts: districts.find(district => district.id === city.district_id)
}));
const linkCities = citiesFixed.map(city => _objectSpread({}, city, {
  regions: "/regions/".concat(city.region_id),
  districts: "/districts/".concat(city.district_id)
}));
const serverPort = 9785;
const app = (0, _express.default)(); // const options = {
//   key: fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/25mbcloud.ml', 'privkey.pem')),
//   cert: fs.readFileSync(path.join(__dirname, '../../../etc/letsencrypt/live/25mbcloud.ml', 'fullchain.pem')),
// };

app.use(_bodyParser.default.json());
app.use((0, _cors.default)({
  origin: '*'
}));
/**
 * GET fullcities
 * 127.0.0.1:9785/fullcities?name=москва
 * PARAMS
 * name
 */

app.get('/fullcities', (req, res) => {
  let newCities = updateCities;

  if (req.query.name && req.query.name.length > 0) {
    newCities = updateCities.filter(item => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }

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
    newCities = linkCities.filter(item => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
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
    newCities = citiesFixed.filter(item => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }

  res.send(newCities || []);
});
/**
 * GET cities/:id
 * 127.0.0.1:9785/cities/1
 */

app.get('/cities/:id', (req, res) => {
  const newCities = citiesFixed.filter(item => String(item.id) === req.params.id);
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
    newDistricts = districts.filter(item => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }

  res.send(newDistricts || []);
});
/**
 * GET districts/:id
 * 127.0.0.1:9785/districts/1
 */

app.get('/districts/:id', (req, res) => {
  const newDistricts = districts.filter(item => String(item.id) === req.params.id);
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
    newRegions = regions.filter(item => item.name.toLowerCase().includes(req.query.name.toLowerCase()));
  }

  res.send(newRegions || []);
});
/**
 * GET regions/:id
 * 127.0.0.1:9785/regions/1
 */

app.get('/regions/:id', (req, res) => {
  const newRegions = regions.filter(item => String(item.id) === req.params.id);
  res.send(newRegions || []);
});
/**
 * GET *
 * 127.0.0.1:9785/*
 */

app.use('*', (req, res) => {
  res.status(404);

  if (req.accepts('json')) {
    res.send({
      error: 'Not found'
    });
    return;
  }

  res.send('Not found');
}); // https.createServer(options, app).listen(serverPort, function () {
//     console.log(`Express server listening on port ${serverPort}`);
// });

_http.default.createServer(app).listen(serverPort, function () {
  console.log("Express server listening on port ".concat(serverPort));
});