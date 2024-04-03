const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({ title: String, director: String, year: String, description: String, demat: Boolean, dvdQuantity: Number, bluRayQuantity: Number });
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;