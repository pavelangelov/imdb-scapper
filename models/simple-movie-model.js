/* globals require module */
"use strict";

const urlParser = require("../utils/url-parser");
const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let SimpleMovieSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imdbId: {
        type: String,
        required: true
    }
});

let SimpleMovie;
SimpleMovieSchema.statics.getSimpleMovieByNameAndUrl =
    function(name, url) {
        let imdbId = urlParser.extractIdFromUrl(url);
        return new SimpleMovie({ name, imdbId });
    };

SimpleMovieSchema.virtual.imdbUrl = function() {
    return `http://imdb.com/title/${this.imdbId}/?ref_=adv_li_tt`;
};

mongoose.model("SimpleMovie", SimpleMovieSchema);
SimpleMovie = mongoose.model("SimpleMovie");
module.exports = SimpleMovie;