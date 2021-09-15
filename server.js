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

//weartherbit api (crateing endpiont)
app.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});

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

//movie api (crateing endpiont)

let handleMovies = async (req, res) => {
	let search_name = req.query.query;

	let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${search_name}`;
	let axiosResponse = await axios.get(url);

	let moviesData = axiosResponse.data;
	let cleanedData = moviesData.results.map((item) => {
		return new MovieCast(
			item.title,
			item.overview,
			item.vote_average,
			item.vote_count,
			item.poster_path,
			item.popularity,
			item.release_date
		);
	});

	res.status(200).json(cleanedData);
};
app.get("/movies", handleMovies);
class MovieCast {
	constructor(
		title,
		overview,
		vote_average,
		vote_count,
		poster_path,
		popularity,
		release_date
	) {
		this.title = title;
		this.overview = overview;
		this.vote_average = vote_average;
		this.vote_count = vote_count;
		this.poster_path = `http://image.tmdb.org/t/p/w500${poster_path}`;
		this.popularity = popularity;
		this.release_date = release_date;
	}
}
