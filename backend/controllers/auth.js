const User = require("../models/User");
const UserFavourites = require("../models/UserFavourites");
const jwt = require("jsonwebtoken");

async function register(req, res) {
    const { username, password } = req.body;

    if (!(username && password)) {
        res.status(401).json({ error: "Missing information" });
        return;
    }

    const sameUsername = await User.countDocuments({ username });
    if (sameUsername) {
        res.status(401).json({ error: "An account with this username already exists" })
        return;
    }

    const user = new User({ username, password, admin: false });
    const { _id } = await user.save();

    const userFavourites = new UserFavourites({ userId: _id });
    await userFavourites.save();

    res.end();
}

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });

    if (!user) {
        res.status(401).json({ error: "Wrong credentials" });
        return;
    }

    if (user.password !== password) {
        res.json({ error: "Wrong credentials" });
        return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token, isAdmin: user.admin });
}

module.exports = { register, login };