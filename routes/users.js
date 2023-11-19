const router = require('express').Router();
const {
  updateUser,
  deleteUser,
  getAUser,
  unfollowAUser,
  followAUser
} = require('../controller/user_controller');

// Update user settings
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

// Get a User
router.get("/:id", getAUser);

// Follow a User
router.put("/:id/follow", followAUser);

// Unfollow a User
router.put("/:id/unfollow", unfollowAUser);

module.exports = router;