const UserFavourites = require("../models/UserFavourites");

async function addFavourite(req, res) {
    const movieId = req.body.movieId;
    const userId = req.body.userId;

    console.log(userId, movieId);

    await UserFavourites.updateOne({ userId: userId }, { $push: { favourites: movieId } });

    res.json({ ok: "OK" });
}

async function getFavourites(req, res) {
    const userId = req.query.userId;

    const favourites = await UserFavourites.findOne({ userId }, { favourites: 1, _id: 0 });

    res.json(favourites.favourites);
}

module.exports = { addFavourite, getFavourites };