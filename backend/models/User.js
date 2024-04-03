const mongoose = require("mongoose");

const userSchema = mongoose.Schema({ username: String, password: String, admin: Boolean, favourites: { type: [String], default: [] } })
const User = mongoose.model("User", userSchema);

module.exports = User;