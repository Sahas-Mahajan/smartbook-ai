import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendationCard from "../components/RecommendationCard";
import { getRecommendations } from "../services/recommendationService";

function Recommendations() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchRecommendations = async () => {
      try {
        const token = localStorage.getItem("smartbook_token");
        const userData = localStorage.getItem("smartbook_user");

        // Check login
        if (!token || !userData) {
          navigate("/login");
          return;
        }

        const user = JSON.parse(userData);

        if (!user.email) {
          throw new Error(
            "User information not found. Please login again."
          );
        }

        const recommendationsKey =
          `smartbook_recommendations_${user.email}`;

        // Check sessionStorage
        const savedRecommendations =
          sessionStorage.getItem(recommendationsKey);

        if (savedRecommendations) {
          try {
            const parsedRecommendations =
              JSON.parse(savedRecommendations);

            if (
              Array.isArray(parsedRecommendations) &&
              parsedRecommendations.length > 0
            ) {
              if (isMounted) {
                setRecommendations(parsedRecommendations);
                setLoading(false);
              }
              return;
            }

            // Remove empty or invalid cached recommendations
            sessionStorage.removeItem(recommendationsKey);
          // eslint-disable-next-line no-unused-vars
          } catch (err) {
            sessionStorage.removeItem(recommendationsKey);
          }
        }

        // Generate fresh recommendations
        const response = await getRecommendations(user.email);

        const generatedRecommendations =
          response.data.recommendations || [];

        if (!isMounted) return;

        if (generatedRecommendations.length === 0) {
          setError(
            "No matching books found. Please update your reading preferences and try again."
          );
          setRecommendations([]);
          return;
        }

        // Save recommendations in sessionStorage
        sessionStorage.setItem(
          recommendationsKey,
          JSON.stringify(generatedRecommendations)
        );

        setRecommendations(generatedRecommendations);

      } catch (err) {
        console.error(
          "Recommendation Fetch Error:",
          err
        );

        if (isMounted) {
          setError(
            err.response?.data?.message ||
            err.message ||
            "Failed to generate recommendations. Please try again."
          );
        }

      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRecommendations();

    return () => {
      isMounted = false;
    };

  }, [navigate]);

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-indigo-600 text-xl font-semibold">
            Generating your recommendations...
          </p>

          <p className="text-gray-500 mt-2">
            Our AI is finding books based on your reading preferences.
          </p>
        </div>
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

            <button
              onClick={() => navigate("/questionnaire")}
              className="block mx-auto mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
            >
              Update Preferences
            </button>
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