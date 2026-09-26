import { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import RecommendationCard from "../components/RecommendationCard";

function Books() {
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [totalBooks, setTotalBooks] = useState(0);

  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("");

  const [difficulty, setDifficulty] = useState("");

  const [maxPages, setMaxPages] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      setLoading(true);

      setError("");

      const response = await getBooks({
        search: search,
        genre: genre,
        difficulty: difficulty,
        maxPages: maxPages,
        page: currentPage,
        limit: 12,
      });

      setBooks(response.data.data);

      setTotalBooks(response.data.count);
    } catch (error) {
      console.error("Book search error:", error);

      setError(error.response?.data?.message || "Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBooks();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search, genre, difficulty, maxPages, currentPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  // Search
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  // Genre
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    setCurrentPage(1);
  };

  // Difficulty
  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    setCurrentPage(1);
  };

  // Maximum pages
  const handleMaxPagesChange = (event) => {
    setMaxPages(event.target.value);
    setCurrentPage(1);
  };

  // Clear filters
  const clearFilters = () => {
    setSearch("");

    setGenre("");

    setDifficulty("");

    setMaxPages("");

    setCurrentPage(1);
  };

  const booksPerPage = 12;

  const totalPages = Math.ceil(totalBooks / booksPerPage);
  return (
    <div className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-10">
          <p className="text-indigo-600 font-semibold mb-2">
            📚 SmartBook Library
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore Books
          </h1>

          <p className="text-gray-500 mt-4">
            Search and filter books based on your preferences.
          </p>
        </div>

        {/* Search */}

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>

            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search by book title or author..."
              className="w-full pl-12 pr-5 py-4 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Genre */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Genre
              </label>

              <select
                value={genre}
                onChange={handleGenreChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Genres</option>

                <option value="Fiction">Fiction</option>

                <option value="Self-Help">Self-Help</option>

                <option value="Science">Science</option>

                <option value="Psychology">Psychology</option>

                <option value="History">History</option>
              </select>
            </div>

            {/* Difficulty */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={handleDifficultyChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Difficulties</option>

                <option value="Beginner">Beginner</option>

                <option value="Intermediate">Intermediate</option>

                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* Maximum Pages */}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maximum Pages
              </label>

              <input
                type="number"
                min="1"
                value={maxPages}
                onChange={handleMaxPagesChange}
                placeholder="e.g. 300"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Clear Filters */}

          {(search || genre || difficulty || maxPages) && (
            <div className="mt-5 flex justify-end">
              <button
                onClick={clearFilters}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

            <p className="text-gray-500 mt-5">Loading books...</p>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="max-w-lg mx-auto bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <div className="text-5xl mb-4">😕</div>

            <h2 className="text-xl font-bold text-red-700">
              Something went wrong
            </h2>

            <p className="text-red-600 mt-3">{error}</p>

            <button
              onClick={fetchBooks}
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* No Results */}

        {!loading && !error && books.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-5">📚</div>

            <h2 className="text-2xl font-bold text-gray-900">No books found</h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        )}

        {/* Books */}

        {!loading && !error && books.length > 0 && (
          <div>
            <p className="text-gray-600 mb-6">
              Found{" "}
              <span className="font-bold text-gray-900">{totalBooks}</span> book
              {totalBooks !== 1 ? "s" : ""}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <RecommendationCard
                  key={book._id}
                  book={{
                    ...book,
                    bookId: book._id,
                  }}
                  showRecommendationInfo={false}
                  showAddButton={true}
                />
              ))}
            </div>

            {/* Pagination */}

            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-5 py-3 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Previous
              </button>

              <span className="font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Books;
