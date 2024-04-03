const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

dotenv.config();

app.use(cors());
app.use(session({
    secret: "Très secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL);

const routes = require("./routes/index");
app.use("/", routes);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});