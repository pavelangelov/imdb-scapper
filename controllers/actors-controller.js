const modelFactory = require("../models");
const urlParser = require("../utils/url-parser");
const htmlParser = require("../utils/html-parser");
const httpRequester = require("../utils/http-requester");
const timeout = require("../utils/custom-timeout");

let actorsIds = [];
let actorUrls = [];

function getActorInfo(url) {
    console.log(`Working with ${url}`);
    httpRequester.get(url)
        .then((page) => {
            let actor = htmlParser.extractActorInfo(page.body);

            modelFactory.saveActor(actor);
            return timeout(500);
        })
        .then(() => {
            if (actorUrls.length === 0) {
                return;
            }

            getActorInfo(actorUrls.pop());
        })
        .catch(err => console.log(err));
}

function run() {
    return new Promise((resolve, reject) => {
        modelFactory.getActors()
            .then(actors => {
                actors.forEach(actorsArr => {
                    actorsArr.actors.forEach(actor => {
                        if (actor.id && !actorsIds.some(id => id === actor.id)) {
                            actorsIds.push(actor.id);
                            let url = urlParser.getActorUrl(actor.id);
                            actorUrls.push(url);
                        }
                    });
                });
            })
            .then(() => {
                Array.from({ length: 20 })
                    .forEach(() => getActorInfo(actorUrls.pop()));
            })
            .catch(err => reject(err));
    });
}
module.exports = run;