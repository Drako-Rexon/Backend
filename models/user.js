const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passComplex = require('joi-password-complexity');
// const Joi = require('joi');

const userScema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    gender: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
    likedSongs: { type: [String], default: [] },
    playlists: { type: [String], default: [] },
    isAdmin: { type: Boolean, default: false },
});

userScema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.name, isAdmin: this.isAdmin },
        process.env.JWTPVTKEY,
        { expiresIn: "7d" }
    );
    return token;
}

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required(),
        password: passComplex().required(),
        month: Joi.string().required(),
        phoneNo: Joi.string().required(),
        date: Joi.string().required(),
        year: Joi.string().required(),
        gender: Joi.string().valid("male", "female", "non-binary").required(),
    });
    return schema.validate(user);
}

const User = mongoose.model("user", userScema);

module.exports = { User, validate };