"use strict";
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
require("dotenv").config();

const weatherData = require("./data/weather.json");
const PORT = process.env.PORT;

app.get("/", (req, res) => {
	res.status(200).send("hello world");
});

// app.get("/data", (req, res) => {
// 	let city = weatherData[2];
// 	let forecastDays = city.data.map((day) => {
// 		return {
// 			date: day.valid_date,
// 			description: day.weather.description,
// 		};
// 	});
// 	let costumResponse = {
// 		forecast: forecastDays,
// 		city_name: city.city_name,
// 	};
// 	res.status(200).json(costumResponse);
// });

app.get("/weather-data", (req, res) => {
	let lat = Number(req.query.lat);
	let lon = Number(req.query.lon);

	if (lat && lon) {
		let result = [];
		weatherData.forEach((item) => {
			if (item.lat === lat && item.lon === lon) {
				return result.push(item);
			}
		});
		let city = result[0];
		let forecast = city.data.map((item) => {
			return {
				datetime: item.datetime,
				description: item.weather.description,
			};
		});
		res.status(200).json(forecast);
	} else {
		res.status(400).send("please provide correct query parameters");
	}
});

app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
