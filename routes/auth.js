const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

// * Registration
router.post("/register", async (req, res) => {
	try {
		// generating encrypted password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// save user and respond
		const saveUser = await newUser.save();
		res.status(201).json(saveUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

// * Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).json("User Not Found");

		const validPassword = await bcrypt.compare(req.body.password, user.password);
		!validPassword && res.status(400).json("Wrong Password");

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;