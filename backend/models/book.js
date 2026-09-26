const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    genres: {
    type: [String],
    required: true,
    },

    subGenre: {
      type: String,
    },

    language: {
      type: String,
      default: "English",
    },

    difficulty: {
      type: String,
      enum: [
        "Beginner",
        "Intermediate",
        "Advanced",
      ],
      default: "Beginner",
    },

    pages: {
      type: Number,
      required: true,
      min: 1,
    },

    estimatedReadingHours: {
      type: Number,
      min: 0,
    },

    image: {
      type: String,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    tags: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Book =
  mongoose.models.Book ||
  mongoose.model("Book", bookSchema);

module.exports = Book;