const currentData = async (req, res) => {
  try {
    let location = await req.body.name;
    let unit = await req.body.tempunit;
    let unitName;
    let speedName;
    if (!location) {
      res.status(404).send("location not found");
    }
    if (unit === "metric" || unit === "Metric") {
      unitName = "celsius";
      speedName = "meter/sec";
    } else if (unit === "imperial" || unit==="Imperial") {
      unitName = "Fahrenheit ";
      speedName = "miles/hour";
    } else {
      unitName = "Kelvin";
      speedName = "meter/sec";
    }
    // console.log(location)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.APIKEY}&units=${unit}`;
    const response = await fetch(url);

    if (response.ok) {
      const weatherData = await response.json();
      console.log(weatherData);
      const temp = Math.round(weatherData.main.temp);
      const descrp = weatherData.weather[0].description;

      const sendData = {};
      sendData.temp = temp + " " + unitName;
      sendData.weather = descrp;
      sendData.location = location;
      sendData.feel = weatherData.main.feels_like + " " + unitName;
      sendData.humidity = weatherData.main.humidity + "%";
      sendData.windSpeed = weatherData.wind.speed + " " + speedName;
      res.status(200).json(sendData);
    } else {
      const data = await response.json();
      res.status(401).send(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  currentData,
};
