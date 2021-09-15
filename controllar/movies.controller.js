"use strict";
const MovieCast = require("../modules/movies.modules");
const axios = require("axios");
const handleMovies = async (req, res) => {
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

module.exports = handleMovies;
