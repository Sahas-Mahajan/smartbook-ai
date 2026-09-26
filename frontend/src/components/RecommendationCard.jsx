import { Link } from "react-router-dom";

function RecommendationCard({
  book,
  showRecommendationDetails = false,
  showAddButton = false,
}) {

  // Add book to My Books
  const handleAddToMyBooks = () => {

    // Check login status
    const token =
      localStorage.getItem("smartbook_token");

    // User is not logged in
    if (!token) {
      alert(
        "Please login or create an account to add books to My Books."
      );

      return;
    }

    // Get logged-in user
    const userData =
      localStorage.getItem("smartbook_user");

    const user =
      userData ? JSON.parse(userData) : null;

    // Safety check
    if (!user || !user.email) {
      alert(
        "User information not found. Please login again."
      );

      return;
    }

    // Create user-specific favorites key
    const favoritesKey =
      `smartbook_favorites_${user.email}`;

    // Get existing favorites for this user
    const savedBooks =
      JSON.parse(
        localStorage.getItem(favoritesKey)
      ) || [];

    // Check whether book already exists
    const alreadySaved =
      savedBooks.some(
        (savedBook) =>
          savedBook.bookId === book.bookId
      );

    if (alreadySaved) {
      alert(
        "This book is already in your My Books."
      );

      return;
    }

    // Add book
    const updatedBooks = [
      ...savedBooks,
      book,
    ];

    // Save books for this specific user
    localStorage.setItem(
      favoritesKey,
      JSON.stringify(updatedBooks)
    );

    alert(
      "Book added to My Books!"
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">

      {/* Book Image */}
      <div className="h-72 bg-gray-100 flex items-center justify-center">

        {book.image ? (

          <img
            src={book.image}
            alt={book.title}
            className="w-full h-full object-cover"
          />

        ) : (

          <div className="text-gray-400 text-5xl">
            📚
          </div>

        )}

      </div>

      {/* Content */}
      <div className="p-6">

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">
          {book.title}
        </h2>

        {/* Author */}
        <p className="text-gray-500 mt-1">
          by {book.author}
        </p>

        {/* Genres */}
        <div className="flex flex-wrap gap-2 mt-4">

          {book.genres?.map((genre, index) => (

            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
            >
              {genre}
            </span>

          ))}

        </div>

        {/* Book Information */}
        <div className="flex justify-between items-center mt-5 text-gray-600">

          <span>
            📄 {book.pages} pages
          </span>

          <span>
            ⭐ {book.rating || "N/A"}
          </span>

        </div>

        {/* AI Recommendation Details */}
        {showRecommendationDetails && (

          <>

            {/* Match Score */}
            <div className="mt-6">

              <div className="flex justify-between mb-2">

                <span className="font-semibold text-gray-700">
                  SmartBook Match
                </span>

                <span className="font-bold text-indigo-600">
                  {book.matchScore}%
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">

                <div
                  className="bg-indigo-600 h-3 rounded-full transition-all duration-700"
                  style={{
                    width: `${book.matchScore}%`,
                  }}
                />

              </div>

            </div>

            {/* AI Reason */}
            <div className="mt-6 bg-indigo-50 rounded-xl p-4">

              <h3 className="font-semibold text-indigo-900 mb-2">
                🤖 Why this book?
              </h3>

              <p className="text-gray-700 text-sm leading-relaxed">
                {book.reason}
              </p>

            </div>

          </>

        )}

        {/* Add to My Books */}
        {showAddButton && (

          <button
            onClick={handleAddToMyBooks}
            className="w-full mt-6 py-3 rounded-lg font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            ♡ Add to My Books
          </button>

        )}

        {/* View Details */}
        <Link
          to={`/books/${book.bookId}`}
          className="block text-center mt-5 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}

export default RecommendationCard;