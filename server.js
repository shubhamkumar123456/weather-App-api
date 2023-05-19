const express = require("express");
const rateLimit= require('express-rate-limit');

const forcastRoute = require("./routes/forecast");
const currentWeatherRoute = require("./routes/currentWeather");

const app = express();
app.use(express.json());
require("dotenv").config();

const port = 3000;

// Global middleware
const limiter=rateLimit({
  max:60,
  windowMs:60*60*1000,
  message:"Too many requests from this Ip, please try again in an hour"
})
app.use('/',limiter)

// Routes
app.use("/weatherForcast", forcastRoute);
app.use("/currentWeather", currentWeatherRoute);

app.listen(port, () => {
  console.log(`server is listening at ${port} port...`);
});
