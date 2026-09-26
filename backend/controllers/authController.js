const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require("../services/emailService");

const generateVerificationCode = require("../utils/generateVerificationCode");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    // Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please use a valid Gmail address.",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the account exists but is not verified,
      // generate and send a new verification code.
      if (!existingUser.isVerified) {
        const verificationCode =
          generateVerificationCode();

        existingUser.verificationCode =
          verificationCode;

        existingUser.verificationCodeExpires =
          new Date(Date.now() + 10 * 60 * 1000);

        await existingUser.save();

        await sendVerificationEmail(
          email,
          verificationCode
        );

        return res.status(200).json({
          success: true,
          message:
            "A new verification code has been sent to your Gmail.",
          requiresVerification: true,
          email,
        });
      }

      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Generate 6-digit verification code
    const verificationCode =
      generateVerificationCode();

    // Code expires after 10 minutes
    const verificationCodeExpires =
      new Date(Date.now() + 10 * 60 * 1000);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      isVerified: false,

      verificationCode,
      verificationCodeExpires,
    });

    // Send verification email
    await sendVerificationEmail(
      email,
      verificationCode
    );

    res.status(201).json({
      success: true,
      message:
        "Account created. A verification code has been sent to your Gmail.",
      requiresVerification: true,
      email: user.email,
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message:
        "Server error during registration",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check email verification
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before logging in.",
        requiresVerification: true,
        email: user.email,
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message:
        "Server error during login",
    });
  }
};

// VERIFY EMAIL
const verifyEmail = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Email and verification code are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email is already verified",
      });
    }

    if (!user.verificationCode) {
      return res.status(400).json({
        success: false,
        message: "No verification code found. Please request a new code.",
      });
    }

    if (
      user.verificationCodeExpires &&
      user.verificationCodeExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Verification code has expired. Please request a new code.",
      });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid verification code",
      });
    }

    // Verification successful
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    res.status(500).json({
      success: false,
      message: "Server error during email verification",
    });
  }
};

// FORGOT PASSWORD
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const gmailRegex =
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!gmailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Gmail address.",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "No account found with this Gmail address.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message:
          "Please verify your email before resetting your password.",
        requiresVerification: true,
        email: user.email,
      });
    }

    // Generate 6-digit reset code
    const resetCode =
      generateVerificationCode();

    // Code expires after 10 minutes
    const resetCodeExpires =
      new Date(Date.now() + 10 * 60 * 1000);

    user.resetPasswordCode = resetCode;
    user.resetPasswordCodeExpires =
      resetCodeExpires;

    await user.save();

    // Send reset code
    await sendPasswordResetEmail(
      email,
      resetCode
    );

    res.status(200).json({
      success: true,
      message:
        "Password reset code has been sent to your Gmail.",
      email: user.email,
    });
  } catch (error) {
    console.error(
      "Forgot password error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while sending password reset code.",
    });
  }
};

// VERIFY PASSWORD RESET CODE
const verifyResetCode = async (req, res) => {
  try {
    const { email, resetCode } = req.body;

    if (!email || !resetCode) {
      return res.status(400).json({
        success: false,
        message: "Email and reset code are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resetPasswordCode) {
      return res.status(400).json({
        success: false,
        message:
          "No password reset code found. Please request a new code.",
      });
    }

    if (
      user.resetPasswordCodeExpires &&
      user.resetPasswordCodeExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password reset code has expired. Please request a new code.",
      });
    }

    if (user.resetPasswordCode !== resetCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid password reset code",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reset code verified successfully",
    });
  } catch (error) {
    console.error(
      "Reset code verification error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error during reset code verification",
    });
  }
};

// RESET PASSWORD
const resetPassword = async (req, res) => {
  try {
    const {
      email,
      resetCode,
      newPassword,
    } = req.body;

    if (!email || !resetCode || !newPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Email, reset code and new password are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "New password must be at least 6 characters",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.resetPasswordCode) {
      return res.status(400).json({
        success: false,
        message:
          "No password reset code found. Please request a new code.",
      });
    }

    if (
      user.resetPasswordCodeExpires &&
      user.resetPasswordCodeExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password reset code has expired. Please request a new code.",
      });
    }

    if (user.resetPasswordCode !== resetCode) {
      return res.status(400).json({
        success: false,
        message: "Invalid password reset code",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    user.password = hashedPassword;

    // Invalidate the reset code
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpires = null;

    await user.save();

    res.status(200).json({
      success: true,
      message:
        "Password reset successfully. Please login with your new password.",
    });
  } catch (error) {
    console.error(
      "Password reset error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while resetting password",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  verifyResetCode,
  resetPassword,
};