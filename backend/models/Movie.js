const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({ title: String, director: String, year: Number, description: String, demat: Boolean, dvdQuantity: Number, bluRayQuantity: Number });
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;