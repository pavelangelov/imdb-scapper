const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

let ActorSchema = new Schema({
    image: { type: String },
    name: {
        type: String,
        required: true
    },
    biography: { type: String },
    movies: { type: Array }
});

mongoose.model("Actor", ActorSchema);
let Actor = mongoose.model("Actor");
module.exports = Actor;
