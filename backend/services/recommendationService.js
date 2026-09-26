const ai = require("../utils/gemini");

const generateRecommendations = async (profile, books) => {
  const bookData = books.map((book, index) => ({
    index,
    title: book.title,
    author: book.author,
    description: book.description,
    genres: book.genres,
    subGenre: book.subGenre,
    difficulty: book.difficulty,
    pages: book.pages,
    estimatedReadingHours: book.estimatedReadingHours,
    rating: book.rating,
    tags: book.tags,
  }));

  const prompt = `
You are SmartBook's AI book recommendation engine.

Your job is to recommend books based on the user's reading profile.

USER PROFILE:
Reading Goal: ${profile.readingGoal}
Preferred Genres: ${profile.preferredGenres.join(", ")}
Daily Reading Time: ${profile.dailyReadingTime}
Preferred Difficulty: ${profile.preferredDifficulty}
Maximum Pages: ${profile.maxPages}

AVAILABLE BOOKS:
${JSON.stringify(bookData, null, 2)}

RECOMMENDATION RULES:

1. Recommend only books from the AVAILABLE BOOKS list.
2. Never invent a book.
3. Never invent an author.
4. Consider the user's reading goal.
5. Consider preferred genres.
6. Respect the maximum page preference.
7. Consider the user's preferred difficulty.
8. Consider the user's available reading time.
9. Give higher scores to books that match multiple preferences.
10. Return the best 3 books.
11. Explain briefly why each recommended book matches the user.
12. The "index" must exactly match the index of the selected book from AVAILABLE BOOKS.

Return only JSON matching the required schema.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt,
    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",
        properties: {
          recommendations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                index: {
                  type: "integer",
                },
                matchScore: {
                  type: "integer",
                },
                reason: {
                  type: "string",
                },
              },
              required: [
                "index",
                "matchScore",
                "reason",
              ],
            },
          },
        },
        required: ["recommendations"],
      },
    },
  });

  return JSON.parse(response.text);
};

module.exports = {
  generateRecommendations,
};