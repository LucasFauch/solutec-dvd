const Movie = require("../models/Movie");
const UserFavourites = require("../models/UserFavourites");

async function getMovie(req, res) {
    const movieId = req.params.id;
    const userId = req.auth.userId;

    const movie = (await Movie.findById(movieId)).toObject();

    const { favourites } = await UserFavourites.findOne({ userId }, { favourites: 1, _id: 0 });
    const isFavourite = favourites.includes(movie._id);

    res.json({ ...movie, favourite: isFavourite });
}

async function allMovies(req, res) {
    const userId = req.auth.userId;
    let movies = await Movie.find({});
    const { favourites } = await UserFavourites.findOne({ userId }, { favourites: 1, _id: 0 });

    movies = movies.map((movie) => ({
        ...movie.toObject(),
        favourite: favourites.includes(movie._id),
    }));

    res.json(movies);
}

async function addMovie(req, res) {
    const { title, director, year, description, stock } = req.body;

    if (!(title && director && year && description)) {
        res.json({ error: "Missing information" });
        return;
    }

    const sameMovie = await Movie.countDocuments({ title });
    if (sameMovie) {
        res.json({ error: "This movie is already in the database" });
        return;
    }

    const movie = new Movie({ title, director, year, description, stock });
    movie.save();

    res.end();
}

async function deleteMovie(req, res) {
    const id = req.params.id;
    Movie.findByIdAndDelete(id);
    res.end();
}

module.exports = { allMovies, getMovie, addMovie, deleteMovie };