const router = require("express").Router();

const testController = require("../controllers/test");
const authController = require("../controllers/auth");
const movieController = require("../controllers/movie");
const userFavouritesController = require("../controllers/user_favourites");

router.get("/test", testController.testAPI);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.post("/movies/favourites", userFavouritesController.addFavourite);
router.get("/movies/favourites", userFavouritesController.getFavourites);
router.get("/movies/:id", movieController.getMovie);
router.delete("/movies/:id", movieController.deleteMovie);
router.get("/movies", movieController.allMovies);
router.post("/movies", movieController.addMovie);

module.exports = router;