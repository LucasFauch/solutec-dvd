const Movie = require("../models/Movie");

async function testAPI(req, res) {
    await Movie.updateMany({}, { stock: { Dematerialized: 1, DVD: 0, "Blu-Ray": 0 } });
    res.end();
}

module.exports = { testAPI };