const User = require("../models/User");

async function register(req, res) {
    const { username, password } = req.body;

    if (!(username && password)) {
        res.json({ error: "Missing information" });
        return;
    }

    const sameUsername = await User.countDocuments({ username });
    if (sameUsername) {
        res.json({ error: "An account with this username already exists" })
        return;
    }

    const user = new User({ username, password, admin: false });
    const id = await user.save();
    console.log(id);

    res.json({ ok: "OK" });
}

async function login(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username }, { password: 1, _id: 0 });

    if (!user) {
        res.json({ error: "Wrong credentials" });
        return;
    }

    if (user.password !== password) {
        res.json({ error: "Wrong credentials" });
        return;
    }

    res.json({ ok: "OK" });
}

module.exports = { register, login };