const router = require("express").Router();
const Post = require("../models/Posts");
const User = require("../models/User");

// router.get("/", (req, res) => {
//     res.send("This is post page");
// });

// * create a post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// * update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("The post has been updated");
        } else {
            res.status(403).json("You can only update your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// * delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("The post has been deleted");
        } else {
            res.status(403).json("You can only delete your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// * like/dislike a post
router.put("/:id/like", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        return res.status(500).json(err);
    }
});

// * get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const { createdAt, ...other } = post._doc;
        res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
})

// * get timeline posts
router.get("/timeline/all", async (req, res) => {
    // let postarray = [];
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        return res.json(userPost.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json(err);
    }
})

module.exports = router;