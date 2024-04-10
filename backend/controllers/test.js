function testAPI(req, res) {
    console.log(req.auth);
    res.json({ ...req.auth });
}

module.exports = { testAPI };