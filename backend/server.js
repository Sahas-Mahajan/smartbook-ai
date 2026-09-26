const dotenv = require("dotenv");

dotenv.config();

console.log(
    "Gemini API Key loaded:",
    !!process.env.GEMINI_API_KEY
);

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

// Middleware --> allows react to communicate with express & express to read JSON
app.use(cors());
app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recommendations",recommendationRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to SmartBook AI",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});