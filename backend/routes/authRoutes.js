const express = require("express");

const {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  verifyResetCode,
  resetPassword,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/verify-reset-code", verifyResetCode);

router.post("/reset-password", resetPassword);

router.get("/protected", protect, (req, res) => {

  res.status(200).json({
    success: true,
    message: "You accessed a protected route!",
    user: req.user,
  });

});

module.exports = router;