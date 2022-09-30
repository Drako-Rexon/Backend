const router = require('express').Router();
const { User } = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send({ message: "Invalid email or password" });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
        return res.status(400).send({ message: "Invalid email or password" });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "Signing in please wait..." });
});

module.exports = router;




// ? login generated token in same id different tries
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0ODYwYWU5YzNiODZmNDQ0ZDFhODkiLCJuYW1lIjoiaGVsbG95byIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjQzODY2OTYsImV4cCI6MTY2NDk5MTQ5Nn0.NIlHY8ySZAEa5HJANGVeRyObxiD9MEXBv2cl6T3K7Qc

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzM0ODYwYWU5YzNiODZmNDQ0ZDFhODkiLCJuYW1lIjoiaGVsbG95byIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NjQzODY3MjIsImV4cCI6MTY2NDk5MTUyMn0.hOPQgDjftoF4bYgnkCIUFwIVHtPh6JkbbU6k9B8fwio