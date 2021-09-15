"use strict";
const express = require("express");
const app = express();

const cors = require("cors");
const handleMovies = require("./controllar/movies.controller");
const handleWeather = require("./controllar/weather.controller");
app.use(cors());

require("dotenv").config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.status(200).json({ messege: "I am working" });
});

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

app.get("/movies", handleMovies);
app.get("/weather-data", handleWeather);
