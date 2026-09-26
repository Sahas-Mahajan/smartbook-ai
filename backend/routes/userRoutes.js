const express = require("express");

const {
  saveReadingProfile,
  getReadingProfile,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/reading-profile",
  protect,
  saveReadingProfile
);

router.get(
  "/reading-profile/:email",
  getReadingProfile
);

module.exports = router;