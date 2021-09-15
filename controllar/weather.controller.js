"use strict";
const ForeCast = require("../modules/weather.modules");
const axios = require("axios");
const handleWeather = async (req, res) => {
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

module.exports = handleWeather;
