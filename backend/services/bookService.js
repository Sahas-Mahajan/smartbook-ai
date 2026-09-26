const Book = require("../models/book");

const getAllBooks = async (queryOptions) => {

  const {
    search,
    genre,
    difficulty,
    maxPages,
    page = 1,
    limit = 12,
  } = queryOptions;

  let query = {};


  // Search by title or author
  if (search) {

    query.$or = [

      {
        title: {
          $regex: search,
          $options: "i",
        },
      },

      {
        author: {
          $regex: search,
          $options: "i",
        },
      },

    ];
  }


  // Filter by genre
  if (genre) {

    query.genres = genre;

  }


  // Filter by difficulty
  if (difficulty) {

    query.difficulty = difficulty;

  }


  // Filter by maximum pages
  if (maxPages) {

    query.pages = {
      $lte: Number(maxPages),
    };

  }


  // Pagination
  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const skip =
    (pageNumber - 1) * limitNumber;


  // Get books
  const books = await Book
    .find(query)
    .skip(skip)
    .limit(limitNumber);


  // Count matching books
  const totalBooks =
    await Book.countDocuments(query);


  return {

    books,
    totalBooks,

  };

};


module.exports = {

  getAllBooks,

};