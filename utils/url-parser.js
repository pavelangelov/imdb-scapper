//  /title/tt0067992/?ref_=adv_li_tt
function extractIdFromUrl(url) {
    let index = url.indexOf("/?ref");
    return url.substring("/title/".length, index);
}

function generateUrlBuId(id) {
    let url = `http://www.imdb.com/title/${id}/`;

    return url;
}

function getActorUrl(id) {
    let url = `http://www.imdb.com/${id}/`;

    return url;
}

module.exports = {
    extractIdFromUrl,
    generateUrlBuId,
    getActorUrl
};