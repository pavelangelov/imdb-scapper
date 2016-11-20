/* globals module require */

/// <reference path="../typings/index.d.ts" />

const SimpleMovie = require("./simple-movie-model");
const MovieDetails = require("./movie-details-model");
const Actor = require("./actor-model");

module.exports = {
    getSimpleMovie(name, url) {
        return SimpleMovie.getSimpleMovieByNameAndUrl(name, url);
    },
    insertManySimpleMovies(movies) {
        SimpleMovie.insertMany(movies);
    },
    getMoviesIds() {
        return new Promise(resolve => {
            let ids = SimpleMovie.find()
                .select("imdbId");
            resolve(ids);
        });
    },
    insertMoviesDetails(movieDetails) {
        let md = new MovieDetails();
        let keys = Object.keys(movieDetails);
        for (let key of keys) {
            md[key] = movieDetails[key];
        }

        md.save();
    },
    insertManyMoviesDetails(movies) {
        MovieDetails.insertMany(movies);
    },
    getActors() {
        return new Promise((resolve, reject) => {
            MovieDetails.find()
            .select("actors")
            .exec((err, actors) => {
                if (err) {
                    return reject(err);
                }
                console.log("In Factory");
                return resolve(actors);
            });
        });
    },
    saveActor(actorObj) {
        let actor = new Actor();
        let keys = Object.keys(actorObj);
        for (let key of keys) {
            actor[key] = actorObj[key];
        }

        actor.save();
    },
    inserManytActors(actors) {
        Actor.insertMany(actors);
    }
};