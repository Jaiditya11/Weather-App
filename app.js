const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "efe2844284e14e7edf239ba436ff3a9a";
  const url =
    "api.openweathermap.org/data/2.5/weather?q= " +
    query +
    "&appid=" +
    apiKey +
    "&units=metric";
  https.get(url, function (response) {
    console.log(response);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      const wea = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn" + icon + "@2x.png";
      res.send(<h1>"The temp in" + query + "is" + temp</h1>);
      res.write("The weather is currently" + wes);
      res.write("<img src=" + imageURL + ">");
    });
  });
});

app.listen(3000, function () {
  console.log("Server is runnning on port 3000");
});
