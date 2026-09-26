import { useEffect, useState } from "react";
import RecommendationCard from "../components/RecommendationCard";

function MyBooks() {
  const [savedBooks, setSavedBooks] = useState([]);

  // Get logged-in user
  const userData = localStorage.getItem("smartbook_user");
  const user = userData ? JSON.parse(userData) : null;

  // Create a separate favorites key for every user
  const favoritesKey = user
    ? `smartbook_favorites_${user.email}`
    : null;

  // Load saved books
  useEffect(() => {
    if (!favoritesKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSavedBooks([]);
      return;
    }

    const books =
      JSON.parse(localStorage.getItem(favoritesKey)) || [];

    setSavedBooks(books);
  }, [favoritesKey]);

  // Remove book
  const removeBook = (bookId) => {
    const updatedBooks = savedBooks.filter(
      (book) => book.bookId !== bookId
    );

    localStorage.setItem(
      favoritesKey,
      JSON.stringify(updatedBooks)
    );

    setSavedBooks(updatedBooks);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          My Books
        </h1>

        <p className="text-gray-600 mb-8">
          Your saved books and recommendations.
        </p>

        {/* No Books */}
        {savedBooks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <div className="text-6xl mb-4">
              📚
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No saved books yet
            </h2>

            <p className="text-gray-500">
              Add books to My Books and they will appear here.
            </p>
          </div>
        ) : (

          /* Saved Books */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {savedBooks.map((book) => (
              <div
                key={book.bookId}
                className="relative"
              >

                <RecommendationCard
                  book={book}
                  showRecommendationDetails={false}
                />

                <button
                  onClick={() => removeBook(book.bookId)}
                  className="w-full mt-3 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                  Remove from My Books
                </button>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyBooks;