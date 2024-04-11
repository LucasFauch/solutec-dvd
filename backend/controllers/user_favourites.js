const UserFavourites = require("../models/UserFavourites");

async function addFavourite(req, res) {
    const movieId = req.body.movieId;
    const userId = req.auth.userId;

    await UserFavourites.updateOne({ userId }, { $push: { favourites: movieId } });

    res.json({ ok: "OK" });
}

async function getFavourites(req, res) {
    const userId = req.auth.userId;

    const { favourites } = await UserFavourites.findOne({ userId }).populate("favourites");

    res.json(favourites);
}

module.exports = { addFavourite, getFavourites };