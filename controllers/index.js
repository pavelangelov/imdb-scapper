let simpleMoviesController = require("./simple-movies-controller");
let movieDetailController = require("./movie-details-controller");
let actorController = require("./actors-controller");

module.exports = {
    proceedSimpleMovies() {
        simpleMoviesController.run();
    },
    proceedMoviesDetails() {
        movieDetailController.run();
    },
    proceedActors() {
        actorController();
    }
};