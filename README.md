# Get Started

1. run

```alias
yarn
```

to instal dependencies

2. run

```alias
yarn build
```

to building application files

3. run

```alias
yarn start
```

to start application

## Run to Prod

**Update app.js:**

1. Uncomment

```JavaScript
import https from 'https';
```

```JavaScript
https.createServer(options, app).listen(serverPort, function() {
  console.log(`Express server listening on port ${serverPort}`);
});
```

```JavaScript
const options = {
  key: fs.readFileSync(path.join(__dirname, './path/to/private.key', 'private.key')),
  cert: fs.readFileSync(path.join(__dirname, './path/to/certificate.srt', 'certificate.srt')),
};
```

2. To comment

```JavaScript
// import http from 'http';
```

```JavaScript
// http.createServer(app).listen(serverPort, function() {
//   console.log(`Express server listening on port ${serverPort}`);
// });
```

3. Create SSL serts in ./path/to/private.key and './path/to/certificate.srt'


## API

```JavaScript
/**
 * GET cities
 * 127.0.0.1:9785/cities?name=москва
 * PARAMS
 * name
 */
```
```JavaScript
/**
 * GET cities/:id
 * 127.0.0.1:9785/cities/1
 */
```
```JavaScript
 /**
 * GET districts
 * 127.0.0.1:9785/cities?name=Центральный федеральный округ
 * PARAMS
 * name
 */
```
```JavaScript
 /**
 * GET districts/:id
 * 127.0.0.1:9785/districts/1
 */
```
```JavaScript
 /**
 * GET regions
 * 127.0.0.1:9785/regions?name=Центральный федеральный округ
 * PARAMS
 * name
 */
```
```JavaScript
 /**
 * GET regions/:id
 * 127.0.0.1:9785/regions/1
 */
```
```JavaScript
 /**
 * GET *
 * 127.0.0.1:9785/*
 */
```