const API_KEY = "c729575ecda087361cbbd60a490904bc";
const API_KEY_2 = "QzdcTci3tySVMLuE55C4VV7zkFwNpFwW";
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.static("."));

app.get("/get-weather", async (req, res) => {
  const CITY = req.query.city;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(
      "Произошла ошибка при выполнении запроса к OpenWeather API:",
      error
    );
  }
});

app.get("/get-rain", async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 3);

  const startTime = startDate.toISOString();
  const endTime = endDate.toISOString();

  const url = `https://api.tomorrow.io/v4/timelines?location=${lat},${lon}&fields=precipitationIntensity&startTime=${startTime}&endTime=${endTime}&apikey=${API_KEY_2}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(
      "Произошла ошибка при выполнении запроса к Tomorrow API:",
      error
    );
  }
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
