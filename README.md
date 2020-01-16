<div align="center">
  <h1>Russian cities API</h1>
  <br>
  <i>Public API</i>
  <br>
  <p>
    RESTful interface for fast accesing russian cities, districts and regions
  </p>
  <p>
     <a href=https://cities-api.ml/cities>https://cities-api.ml/cities</a>
  </p>
  <p>
</div>

---

## Documentation

Documentation is avaliable in Postman Documenter:  

https://documenter.getpostman.com/view/5482678/SWLmWjBW?version=latest

**If you can't access API through Postman, try to disable Self-signed SSL check in `Settings -> SSL certificate verification`**

---

## Example

Request: 

    curl --location --request GET 'https://cities-api.ml/cities?name=Новгород'

Response:  

    [
        {
            "name": "Нижний Новгород",
            "district_id": 7,
            "region_id": 38,
            "coordinates": "56.296504,43.936059",
            "id": 1337
        },
        {
            "name": "Великий Новгород",
            "district_id": 3,
            "region_id": 39,
            "coordinates": "58.525570,31.274193",
            "id": 1363
        }
    ]

---

### Deploy your own service

1. Install dependencies

```alias
yarn
```


2. Build app

```alias
yarn build
```


3. Run server

```alias
yarn start
```


### SSL changes for production deployment

**In app.js:**

1. Comment/delete lines below:

```JavaScript
// import http from 'http';
```

```JavaScript
// http.createServer(app).listen(serverPort, function() {
//   console.log(`Express server listening on port ${serverPort}`);
// });
```

2. Uncomment following lines

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



3. Place your SSL certificates in `./path/to/private.key` and `./path/to/certificate.srt`

