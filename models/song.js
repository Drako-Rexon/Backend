const mongoose = requier("mongoose");
const Joi = require("joi");
const { model } = require("mongoose");

const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    artist: { type: String, required: true },
    song: { type: String, required: true },
    img: { type: String, required: true },
    duration: { type: String, required: true },
});

const validate = (song) => {
    const Schema = Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        song: Joi.string().required(),
        img: Joi.string().required(),
        duration: Joi.string().required(),
    });
    return Schema.validate(song);
}

const Song = mongoose.model("song", songSchema);

module.exports = { Song, validate };