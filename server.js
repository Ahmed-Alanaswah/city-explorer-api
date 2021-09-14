"use strict";
const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");
app.use(cors());

require("dotenv").config();

// const weatherData = require("./data/weather.json");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.status(200).json({ messege: "I am working" });
});

// app.get("/weather-data", (req, res) => {
// 	let lat = Number(req.query.lat);
// 	let lon = Number(req.query.lon);

// 	if (lat && lon) {
// 		let result = [];
// 		weatherData.forEach((item) => {
// 			if (item.lat === lat && item.lon === lon) {
// 				return result.push(item);
// 			}
// 		});
// 		let city = result[0];
// 		let forecast = city.data.map((item) => {
// 			return {
// 				datetime: item.datetime,
// 				description: item.weather.description,
// 			};
// 		});
// 		res.status(200).json(forecast);
// 	} else {
// 		res.status(400).send("please provide correct query parameters");
// 	}
// });

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

//weartherbit api (crateing endpiont)

let handleWeather = async (req, res) => {
	let city_name = req.query.searchQuery;
	let lat = Number(req.query.lat);
	let lon = Number(req.query.lon);
	let url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;
	let axiosResponse = await axios.get(url);
	let weatherBitData = axiosResponse.data;
	let cleanedData = weatherBitData.data.map((item) => {
		return new ForeCast(item.datetime, item.weather.description);
	});
	res.status(200).json(cleanedData);
};
app.get("/weather-data", handleWeather);
class ForeCast {
	constructor(date, description) {
		this.date = date;
		this.description = description;
	}
}
