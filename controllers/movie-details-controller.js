const htmlParser = require("../utils/html-parser");
const modelsFactory = require("../models");
const timeout = require("../utils/custom-timeout");
const httpRequester = require("../utils/http-requester");
const urlParser = require("../utils/url-parser");

let moviesUrls = [];
let moviesArr = [];

function getMovieDetails(url) {
    httpRequester.get(url)
        .then(page => {
            const html = page.body;
            return htmlParser.parseMovieDetails(html);
        })
        .then(movieDetails => {
            moviesArr.push(movieDetails);

            if (moviesArr.length === 20) {
                let moviesToInsert = moviesArr.splice(0);

                modelsFactory.insertManyMoviesDetails(moviesToInsert);
            }
            modelsFactory.insertMoviesDetails(movieDetails);
            return timeout(500);
        })
        .then(() => {
            if (moviesUrls.length === 0) {
                modelsFactory.insertMoviesDetails(moviesArr);
                return;
            }

            getMovieDetails(moviesUrls.pop());
        })
        .catch(err => console.log(err));
}

function run() {
    modelsFactory.getMoviesIds()
        .then(ids => {
            ids.forEach(id => {
                let url = urlParser.generateUrlBuId(id.imdbId);
                moviesUrls.push(url);
            });
        })
        .then(() => {
            Array.from({ length: 30 })
                .forEach(() => getMovieDetails(moviesUrls.pop()));
        });
}
module.exports.run = run;