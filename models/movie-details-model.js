/* globals */
"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema;
let MovieDetails;

let MovieDetailsSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: { type: String },
    categories: { type: Array },
    actors: { type: Array }
});

// MovieDetailsSchema.statics.getMovieDetailsByUrl =
//     function(name, url) {
//         let imdbId = extractImdbIdFromUrl(url);
//         return new SimpleMovie({ name, imdbId });
//     };

mongoose.model("MovieDetails", MovieDetailsSchema);
MovieDetails = mongoose.model("MovieDetails");
module.exports = MovieDetails;