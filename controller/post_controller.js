const asyncHandler = require('express-async-handler');

const createAPost = asyncHandler(async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

const updatePost = asyncHandler(async (req, res) => {
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

const deletePost = asyncHandler(async (req, res) => {
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

const likeDislikePost = asyncHandler(async (req, res) => {
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

const getAPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const { createdAt, ...other } = post._doc;
    res.status(200).json(other);
  } catch (err) {
    return res.status(500).json(err);
  }
});

const getAllPost = asyncHandler(async (req, res) => {
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
});

module.exports = {
  createAPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getAPost,
  getAllPost,
}