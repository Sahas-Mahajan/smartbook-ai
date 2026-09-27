import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function BookDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchBook = async () => {

      try {

        setLoading(true);
        setError("");

        const response = await axios.get(
          `https://smartbook-ai-backend.onrender.com/api/books/${id}`
        );

        setBook(response.data.data);

      } catch (error) {

        console.error(
          "Book details error:",
          error
        );

        setError(
          error.response?.data?.message ||
          "Failed to load book details."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchBook();

  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="flex flex-col items-center">

          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

          <p className="mt-5 text-gray-600">
            Loading book details...
          </p>

        </div>

      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">

        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center max-w-lg">

          <div className="text-5xl mb-4">
            😕
          </div>

          <h2 className="text-2xl font-bold text-red-700">
            Book Not Found
          </h2>

          <p className="text-red-600 mt-3">
            {error}
          </p>

          <button
            onClick={() => navigate("/books")}
            className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            ← Go Back
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-5 py-12">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 text-indigo-600 font-semibold hover:text-indigo-800 transition"
        >
          ← Go Back
        </button>

        {/* Book Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Book Image */}
            <div className="bg-gray-100 min-h-[500px] flex items-center justify-center">

              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full max-h-[600px] object-contain"
                />
              ) : (
                <div className="text-7xl">
                  📚
                </div>
              )}

            </div>

            {/* Book Information */}
            <div className="p-8 md:p-10">

              <p className="text-indigo-600 font-semibold mb-2">
                📖 Book Details
              </p>

              <h1 className="text-4xl font-bold text-gray-900">
                {book.title}
              </h1>

              <p className="text-lg text-gray-500 mt-2">
                by {book.author}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-5">

                <span className="text-yellow-500 text-xl">
                  ⭐
                </span>

                <span className="font-semibold text-gray-800">
                  {book.rating || "N/A"}
                </span>

              </div>

              {/* Description */}
              <div className="mt-7">

                <h2 className="text-xl font-bold text-gray-900">
                  Description
                </h2>

                <p className="text-gray-600 leading-relaxed mt-3">
                  {book.description ||
                    "No description available for this book."}
                </p>

              </div>

              {/* Genres */}
              <div className="mt-7">

                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Genres
                </h2>

                <div className="flex flex-wrap gap-2">

                  {book.genres?.map((genre, index) => (

                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {genre}
                    </span>

                  ))}

                </div>

              </div>

              {/* Book Information */}
              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Pages
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    {book.pages || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Reading Time
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    {book.estimatedReadingHours
                      ? `${book.estimatedReadingHours} hours`
                      : "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Difficulty
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    {book.difficulty || "N/A"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">
                    Language
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    {book.language || "N/A"}
                  </p>
                </div>

              </div>

              {/* Sub Genre */}
              {book.subGenre && (
                <div className="mt-6">

                  <p className="text-sm text-gray-500">
                    Sub Genre
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {book.subGenre}
                  </p>

                </div>
              )}

              {/* Tags */}
              {book.tags?.length > 0 && (
                <div className="mt-6">

                  <h2 className="text-lg font-bold text-gray-900 mb-3">
                    Tags
                  </h2>

                  <div className="flex flex-wrap gap-2">

                    {book.tags.map((tag, index) => (

                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>

                    ))}

                  </div>

                </div>
              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default BookDetails;
