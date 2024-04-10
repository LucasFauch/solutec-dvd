const mongoose = require("mongoose");

const userFavouritesSchema = mongoose.Schema({ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, favourites: { type: [mongoose.Schema.Types.ObjectId], default: [], ref: "Movie" } })
const UserFavourites = mongoose.model("UserFavourites", userFavouritesSchema);

module.exports = UserFavourites;