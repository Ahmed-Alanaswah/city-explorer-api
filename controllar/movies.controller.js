"use strict";
const MovieCast = require("../modules/movies.modules");
const Cache = require("../helpers/cache");
const axios = require("axios");
let cache = new Cache();
const handleMovies = async (req, res) => {
	let currentDate = new Date();
	console.log("cache date", cache.date.getDate());
	if (cache.data.length > 0 && cache.date.getDate() === currentDate.getDate()) {
		res.json({
			data: cache,
			message: "data retrived from the cache",
		});
	} else {
		let search = req.query.query;

		let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${search}`;

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
		cache.data = cleanedData;
		cache.date = currentDate;
		res.status(200).json({
			data: cache.data,

			message: "data is coming from the api",
		});
	}
};

module.exports = handleMovies;
