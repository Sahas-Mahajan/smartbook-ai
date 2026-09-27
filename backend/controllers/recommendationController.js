const User = require("../models/user");
const Book = require("../models/book");

const {
  generateRecommendations,
} = require("../services/recommendationService");

const getRecommendations = async (req, res) => {
  try {

    const { email } = req.body;

    // 1. Validate email
    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    // 2. Find user profile
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User profile not found.",
      });
    }

    // 3. Get reading profile
    const profile = user.readingProfile;

    // 4. Get books from MongoDB
    const books = await Book.find();

    if (!books || books.length === 0) {
      return res.status(404).json({
        message: "No books available.",
      });
    }

    // 5. Ask Gemini for recommendations
    const aiResult = await generateRecommendations(
      profile,
      books
    );

    // 6. Convert Gemini indexes into real books
    const recommendations =
      aiResult.recommendations.map((item) => {

        const book = books[item.index];

        if (!book) {
          return null;
        }

        return {
          bookId: book._id,
          title: book.title,
          author: book.author,
          image: book.image,
          pages: book.pages,
          genres: book.genres,
          rating: book.rating,
          matchScore: item.matchScore,
          reason: item.reason,
        };
      }).filter(Boolean);

    // 7. Send response
    res.status(200).json({
      recommendations,
    });

  } catch (error) {

    console.error(
      "Recommendation Error:",
      error
    );

    res.status(500).json({
      message:
        error.message ||
        "Failed to generate recommendations.",
    });
  }
};

module.exports = {
  getRecommendations,
};