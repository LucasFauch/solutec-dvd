const mongoose = require("mongoose");

const userSchema = mongoose.Schema({ username: String, password: String, admin: Boolean })
const User = mongoose.model("User", userSchema);

module.exports = User;