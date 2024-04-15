const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({ title: String, director: String, year: Number, description: String, poster: String, stock: { demat: Boolean, dvd: Number, bluRay: Number } });
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;