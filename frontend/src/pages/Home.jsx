import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();


  // Handle Get Started button
  const handleGetStarted = () => {

    const token =
      localStorage.getItem("smartbook_token");

    if (token) {
      // User is already logged in
      navigate("/questionnaire");
    } else {
      // User needs to login first
      navigate("/login");
    }

  };


  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-white">

        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">

          <p className="text-indigo-600 font-semibold text-lg mb-4">
            📚 Welcome to SmartBook
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
            Discover Books That
            <span className="text-indigo-600">
              {" "}Match You
            </span>
          </h1>

          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
            Finding your next great book shouldn't be difficult.
            SmartBook uses AI to understand your reading preferences
            and recommends books that are right for you.
          </p>

        </div>

      </section>


      {/* Personalized Books Section */}
      <section className="py-16 px-6">

        <div className="max-w-5xl mx-auto">

          <div className="bg-indigo-600 rounded-3xl px-8 py-14 md:px-16 text-center text-white">

            <div className="text-5xl mb-5">
              ✨
            </div>

            <h2 className="text-3xl md:text-4xl font-bold">
              Get Your Personalized Books
            </h2>

            <p className="text-indigo-100 text-lg mt-4 max-w-2xl mx-auto">
              Tell SmartBook about your reading goals, favorite
              genres, reading time and preferred difficulty.
              Our AI will find books that match your profile.
            </p>

            <button
              onClick={handleGetStarted}
              className="mt-8 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Get Started →
            </button>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section className="bg-white py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-indigo-600 font-semibold mb-2">
              Simple & Personalized
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How SmartBook Works
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Finding the right book takes only a few simple steps.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Step 1 */}
            <div className="text-center p-8 rounded-2xl border border-gray-200">

              <div className="w-14 h-14 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Tell Us About You
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Answer a few questions about your reading goals,
                interests and preferences.
              </p>

            </div>


            {/* Step 2 */}
            <div className="text-center p-8 rounded-2xl border border-gray-200">

              <div className="w-14 h-14 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                AI Understands You
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                SmartBook analyzes your preferences and compares
                them with books in our library.
              </p>

            </div>


            {/* Step 3 */}
            <div className="text-center p-8 rounded-2xl border border-gray-200">

              <div className="w-14 h-14 mx-auto bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>

              <h3 className="text-xl font-bold text-gray-900 mt-5">
                Get Your Recommendations
              </h3>

              <p className="text-gray-500 mt-3 leading-relaxed">
                Receive personalized books along with an AI-generated
                explanation of why each book matches you.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* Discover Section */}
      <section className="py-20 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <div className="text-5xl mb-5">
            🔎
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Prefer to Explore Yourself?
          </h2>

          <p className="text-gray-500 text-lg mt-4">
            Browse our book library and search by title, author,
            genre, difficulty or page count.
          </p>

          <button
            onClick={() => navigate("/books")}
            className="mt-7 border-2 border-indigo-600 text-indigo-600 px-7 py-3 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white transition"
          >
            Explore Books →
          </button>

        </div>

      </section>


      {/* Footer CTA */}
      <section className="bg-gray-900 text-white py-16 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold">
            Your Next Favorite Book Is Waiting
          </h2>

          <p className="text-gray-400 mt-4 text-lg">
            Let SmartBook help you find it.
          </p>

          <button
            onClick={handleGetStarted}
            className="mt-7 bg-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Get Your Personalized Books →
          </button>

        </div>

      </section>

    </div>
  );
}

export default Home;