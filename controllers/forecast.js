const getData = async (req, res) => {
  try {
    let cityname = await req.query.query;
    if(!cityname){
        res.status(404).send("location not found");
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${process.env.APIKEY}`;
    const response = await fetch(url);
    if (response.ok) {
      const weatherData = await response.json();
      console.log(weatherData.list[0]);
      const temp = Math.round(weatherData.list[0].main.temp) - 273 + " °C";
      const descrp = weatherData.list[0].weather[0].main;

      const sendData = {};

      sendData.temp = temp;
      sendData.weather = descrp;
      sendData.cityname = cityname;
      sendData.humidity = weatherData.list[0].main.humidity + " %";
      sendData.Windspeed = weatherData.list[0].wind.speed + " km/h";

      res.status(200).json(sendData);
    } else {
        const data=await response.json()
        res.status(401).send(data.message)
    }
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};



module.exports = {
  getData,
};
