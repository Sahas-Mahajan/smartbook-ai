const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Email verification
    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: String,
      default: null,
    },

    verificationCodeExpires: {
      type: Date,
      default: null,
    },

    resetPasswordCode: {
      type: String,
      default: null,
    },

    resetPasswordCodeExpires: {
      type: Date,
      default: null,
    },

    readingProfile: {
      readingGoal: {
        type: String,
      },

      preferredGenres: {
        type: [String],
        default: [],
      },

      dailyReadingTime: {
        type: Number,
      },

      preferredDifficulty: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
      },

      maxPages: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

module.exports = User;