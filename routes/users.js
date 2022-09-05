const router = require('express').Router();
const User = require("../models/User");

// Update user settings
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(501).json(err);
        }
    } else {
        return res.status(403).json("You can update your account only");
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            // ? We can use both of them ( below 2 statements)
            //  await User.deleteOne({ _id: req.params.id });
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(502).json(err);
        }
    } else {
        return res.status(403).json("You can deleted your account only");
    }
});

// Get a User
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        // ? The below line is for limitting the data ... To secure our data we only need to send only required data
        const { password, updatedAt, createdAt, ...other } = user._doc
        res.status(200).json(other);
    } catch (err) {
        return res.status(503).json(err);
    }
});

// Follow a User
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                return res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        } catch (err) {
            return res.status(505).json(err);
        }
    } else {
        return res.status(504).json("You cant follow yourself");
    }
});

// Unfollow a User
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You dont follow this user");
            }
        } catch (err) {
            return res.status(505).json(err);
        }
    } else {
        return res.status(504).json("You cant unfollow yourself");
    }
});

module.exports = router;