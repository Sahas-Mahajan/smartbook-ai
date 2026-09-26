import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendationCard from "../components/RecommendationCard";

function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("smartbook_token");
    const userData = localStorage.getItem("smartbook_user");

    // User is not logged in
    if (!token || !userData) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userData);

    if (!user.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("User information not found. Please login again.");
      setLoading(false);
      return;
    }

    const recommendationsKey =
      `smartbook_recommendations_${user.email}`;

    // Check if recommendations already exist
    const savedRecommendations =
      sessionStorage.getItem(recommendationsKey);

    if (savedRecommendations) {
      try {
        const parsedRecommendations =
          JSON.parse(savedRecommendations);

        setRecommendations(parsedRecommendations);
        setLoading(false);
        return;
      } catch (error) {
        console.error(
          "Failed to read saved recommendations:",
          error
        );

        sessionStorage.removeItem(recommendationsKey);
      }
    }

    // No saved recommendations
    setRecommendations([]);
    setLoading(false);
  }, [navigate]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Loading recommendations...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-gray-900">
            Your Recommendations
          </h1>

          <p className="text-gray-500 mt-3">
            Books selected based on your reading preferences.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 bg-red-50 border border-red-200 text-red-600 rounded-lg px-5 py-4 text-center">
            {error}
          </div>
        )}

        {/* No recommendations */}
        {recommendations.length === 0 && !error && (
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md border border-gray-200 p-10 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No Recommendations Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Complete the questionnaire to get personalized
              book recommendations.
            </p>

            <button
              onClick={() => navigate("/questionnaire")}
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Take Questionnaire
            </button>

          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {recommendations.map((book, index) => (
              <RecommendationCard
                key={book.bookId || index}
                book={book}
                showRecommendationDetails={true}
                showAddButton={true}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Recommendations;