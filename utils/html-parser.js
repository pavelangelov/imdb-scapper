/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView,
    $ = require("jquery")(window);

module.exports.parseSimpleMovie = (selector, html) => {
    $("body").html(html);
    let items = [];
    $(selector).each((index, item) => {
        const $item = $(item);

        items.push({
            title: $item.html(),
            url: $item.attr("href")
        });
    });

    return Promise.resolve()
        .then(() => {
            return items;
        });
};


module.exports.parseMovieDetails = (html) => {
    $("body").html(html);
    const imageSelector = ".poster a img",
        titleSelector = ".title_wrapper h1",
        descriptionSelector = "#titleStoryLine div[itemprop=description] p",
        categoriesSelector = "div[itemprop=genre] a";

    let imageLink = $(imageSelector).attr("src"),
        title = $(titleSelector).text(),
        description = $(descriptionSelector).text(),
        categories = [];

    let genres = $(categoriesSelector);
    genres.each((index, item) => {
        let $item = $(item);
        categories.push($item.html());
    });

    const actorsList = $("table.cast_list tr");
    let actors = [];

    actorsList.each((index, item) => {
        let $item = $(item),
            children = $item.find("td.character div").children();

        let actor = {
            "id": $item.find("td.itemprop a").attr("href"),
            "imageLink": $item.find("img").attr("src"),
            "name": $item.find("span[itemprop=name]").text(),
            "role": $(children[1]).text(),
            "heroName": $(children[0]).text()
        };

        actors.push(actor);
    });

    return {
        imageLink,
        title,
        description,
        categories,
        actors
    };
};

module.exports.extractActorInfo = (html) => {
    $("body").html(html);

    let imageSelector = "#name-poster",
        nameSelector = "span[itemprop=name]",
        biographySelector = "#name-bio-text div[itemprop=description]",
        bornSelector = "#name-born-info time",
        moviesSelector = "#filmography .filmo-category-section .filmo-row";

    let imageLink = $(imageSelector).attr("src");
    let name = $(nameSelector).text();
    let biography = $(biographySelector).text();
    let born = $(bornSelector).attr("datetime");

    let movies = [];
    $(moviesSelector).each((index, item) => {
        let $item = $(item);
        let movieName = $item.find("b a").text();
        let imdbId = $item.find("b a").attr("href");

        movies.push({
            movieName,
            imdbId
        });
    });

    return {
        imageLink,
        name,
        biography,
        born,
        movies
    };
};