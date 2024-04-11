const router = require("express").Router();
const { expressjwt: jwtMiddleware } = require("express-jwt");

const jwt = jwtMiddleware({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] });

const testController = require("../controllers/test");
const authController = require("../controllers/auth");
const movieController = require("../controllers/movie");
const userFavouritesController = require("../controllers/user_favourites");

router.get("/test", testController.testAPI);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.post("/movies/favourites", jwt, userFavouritesController.addFavourite);
router.get("/movies/favourites", jwt, userFavouritesController.getFavourites);
router.get("/movies/:id", jwt, movieController.getMovie);
router.delete("/movies/:id", movieController.deleteMovie);
router.get("/movies", jwt, movieController.allMovies);
router.post("/movies", movieController.addMovie);

module.exports = router;