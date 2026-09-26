const User = require("../models/user");

// Create or update reading profile
const saveReadingProfile = async (req, res) => {
  try {

    const {
      readingGoal,
      preferredGenres,
      dailyReadingTime,
      preferredDifficulty,
      maxPages,
    } = req.body;


    // Get logged-in user's email from JWT
    const email = req.user.email;


    // Find logged-in user
    const user = await User.findOne({
      email,
    });


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    // Update only reading profile
    user.readingProfile = {
      readingGoal,
      preferredGenres,
      dailyReadingTime,
      preferredDifficulty,
      maxPages,
    };


    await user.save();


    res.status(200).json({
      success: true,
      message: "Reading profile saved successfully",
      data: user,
    });

  } catch (error) {

    console.error(
      "Save reading profile error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


// Get reading profile
const getReadingProfile = async (req, res) => {
  try {

    const user = await User.findOne({
      email: req.params.email,
    });


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }


    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};


module.exports = {
  saveReadingProfile,
  getReadingProfile,
};