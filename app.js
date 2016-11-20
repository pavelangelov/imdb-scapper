/* globals console require setTimeout Promise */
"use strict";

const constants = require("./config/constants");
const controler = require("./controllers");

require("./config/mongoose")(constants.connectionString);

/* Uncomment operations one by one becose they are slow operations :) */

// controler.proceedSimpleMovies();

// controler.proceedMoviesDetails();

// controler.proceedActors();