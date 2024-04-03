const express = require("express");
const router = express.Router();

const testController = require("../controllers/test");
const userController = require("../controllers/user");
const movieController = require("../controllers/movie");

router.get("/test", testController.testAPI);

router.post("/user/register", userController.register);
router.get("/user/login", userController.login);

router.get("/movies", movieController.allMovies);
router.get("/movies/:id", movieController.getMovie);
router.post("/movies", movieController.addMovie);
router.delete("/movies/:id", movieController.deleteMovie);

module.exports = router;