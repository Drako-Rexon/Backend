const router = require("express").Router();
const {
  createAPost,
  updatePost,
  deletePost,
  getAPost,
  getAllPost,
  likeDislikePost,
} = require("../controller/post_controller");
const Post = require("../models/Posts");
const User = require("../models/User");

// * create a post
router.post("/", createAPost);

// * update a post
router.put("/:id", updatePost);

// * delete a post
router.delete("/:id", deletePost);

// * like/dislike a post
router.put("/:id/like", likeDislikePost);

// * get a post
router.get("/:id", getAPost);

// * get timeline posts
router.get("/timeline/all", getAllPost);

module.exports = router;