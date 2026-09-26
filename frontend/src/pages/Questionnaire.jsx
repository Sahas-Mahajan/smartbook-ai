import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveReadingProfile } from "../services/userService";

function Questionnaire() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [answers, setAnswers] = useState({
    readingGoal: "",
    preferredGenres: [],
    dailyReadingTime: "",
    preferredDifficulty: "",
    maxPages: "",
  });


  // Handle questionnaire submission
  const handleSubmit = async () => {

    // Validate reading goal
    if (!answers.readingGoal) {

      setError(
        "Please select your reading goal."
      );

      return;
    }


    // Validate genres
    if (answers.preferredGenres.length === 0) {

      setError(
        "Please select at least one genre."
      );

      return;
    }


    // Validate reading time
    if (!answers.dailyReadingTime) {

      setError(
        "Please select your daily reading time."
      );

      return;
    }


    // Validate difficulty
    if (!answers.preferredDifficulty) {

      setError(
        "Please select your preferred difficulty."
      );

      return;
    }


    // Validate maximum pages
    if (!answers.maxPages) {

      setError(
        "Please select your maximum pages."
      );

      return;
    }


    setSubmitting(true);
    setError("");


    try {

      // Get logged-in user's information
      const savedUser =
        localStorage.getItem(
          "smartbook_user"
        );


      const user = savedUser
        ? JSON.parse(savedUser)
        : null;


      // Make sure user is logged in
      if (!user?.email) {

        setError(
          "Please login before completing the questionnaire."
        );

        setSubmitting(false);

        navigate("/login");

        return;
      }


      // Send reading profile along with
      // logged-in user's email
      const profileData = {

        email: user.email,

        readingGoal:
          answers.readingGoal,

        preferredGenres:
          answers.preferredGenres,

        dailyReadingTime:
          answers.dailyReadingTime,

        preferredDifficulty:
          answers.preferredDifficulty,

        maxPages:
          answers.maxPages,

      };


      const response =
        await saveReadingProfile(
          profileData
        );


      console.log(
        "Profile saved:",
        response.data
      );


      // Save email so Recommendations page
      // knows which user's recommendations to generate
      localStorage.setItem(
        "smartbook_email",
        user.email
      );


      // Go to recommendations
      navigate("/recommendations");

    } catch (err) {

      console.error(
        "Questionnaire error:",
        err
      );


      setError(
        err.response?.data?.message ||
        "Failed to save your reading profile."
      );

    } finally {

      setSubmitting(false);

    }

  };


  const progress =
    step === 1
      ? 0
      : (step - 1) * 20;


  const nextStep = () => {

    setError("");

    setStep(step + 1);

  };


  const previousStep = () => {

    setError("");

    setStep(step - 1);

  };


  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}

      <div className="max-w-4xl mx-auto px-6 pt-12">

        <div className="text-center">

          <p className="text-indigo-600 font-semibold">
            SmartBook
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mt-2">
            Find Your Perfect Book
          </h1>

          <p className="text-gray-500 mt-3">
            Answer a few questions and we'll understand your reading
            preferences.
          </p>

        </div>


        {/* Progress */}

        <div className="mt-10">

          <div className="flex justify-between text-sm text-gray-500 mb-2">

            <span>
              Step {step} of 5
            </span>

            <span>
              {progress}%
            </span>

          </div>


          <div className="w-full bg-gray-200 rounded-full h-2">

            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
              }}
            ></div>

          </div>

        </div>


        {/* Error */}

        {error && (

          <div className="mb-6 mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">

            {error}

          </div>

        )}


        {/* Questionnaire Card */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mt-8 p-8">


          {/* STEP 1 */}

          {step === 1 && (

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                What is your main reading goal?

              </h2>


              <p className="text-gray-500 mt-2">

                Choose the option that best describes why you want to read.

              </p>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                {[
                  "Personal Growth",
                  "Learning",
                  "Entertainment",
                  "Career",
                  "Relaxation",
                ].map((goal) => (

                  <button
                    key={goal}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        readingGoal: goal,
                      })
                    }
                    className={`p-4 border rounded-xl text-left transition ${
                      answers.readingGoal === goal
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 hover:border-indigo-400"
                    }`}
                  >

                    {goal}

                  </button>

                ))}

              </div>

            </div>

          )}


          {/* STEP 2 */}

          {step === 2 && (

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                Which genres do you like?

              </h2>


              <p className="text-gray-500 mt-2">

                Choose one or more genres.

              </p>


              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">

                {[
                  "Self Help",
                  "Psychology",
                  "Fiction",
                  "Biography",
                  "Science",
                  "History",
                  "Fantasy",
                  "Business",
                  "Technology",
                ].map((genre) => {

                  const selected =
                    answers.preferredGenres.includes(
                      genre
                    );


                  return (

                    <button
                      key={genre}
                      onClick={() => {

                        let updatedGenres;


                        if (selected) {

                          updatedGenres =
                            answers.preferredGenres.filter(
                              (item) =>
                                item !== genre
                            );

                        } else {

                          updatedGenres = [
                            ...answers.preferredGenres,
                            genre,
                          ];

                        }


                        setAnswers({
                          ...answers,
                          preferredGenres:
                            updatedGenres,
                        });

                      }}
                      className={`p-3 border rounded-xl transition ${
                        selected
                          ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-indigo-400"
                      }`}
                    >

                      {genre}

                    </button>

                  );

                })}

              </div>

            </div>

          )}


          {/* STEP 3 */}

          {step === 3 && (

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                How much time can you read every day?

              </h2>


              <p className="text-gray-500 mt-2">

                This helps us estimate how quickly you can finish a book.

              </p>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                {[
                  {
                    label: "15 minutes",
                    value: 15,
                  },
                  {
                    label: "30 minutes",
                    value: 30,
                  },
                  {
                    label: "1 hour",
                    value: 60,
                  },
                  {
                    label: "2+ hours",
                    value: 120,
                  },
                ].map((option) => (

                  <button
                    key={option.value}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        dailyReadingTime:
                          option.value,
                      })
                    }
                    className={`p-4 border rounded-xl text-left ${
                      answers.dailyReadingTime ===
                      option.value
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 hover:border-indigo-400"
                    }`}
                  >

                    {option.label}

                  </button>

                ))}

              </div>

            </div>

          )}


          {/* STEP 4 */}

          {step === 4 && (

            <div>

              <h2 className="text-2xl font-bold text-gray-900">

                What difficulty level do you prefer?

              </h2>


              <p className="text-gray-500 mt-2">

                Choose the reading level you're comfortable with.

              </p>


              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

                {[
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ].map((difficulty) => (

                  <button
                    key={difficulty}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        preferredDifficulty:
                          difficulty,
                      })
                    }
                    className={`p-4 border rounded-xl ${
                      answers.preferredDifficulty ===
                      difficulty
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 hover:border-indigo-400"
                    }`}
                  >

                    {difficulty}

                  </button>

                ))}

              </div>

            </div>

          )}


          {/* STEP 5 */}

          {step === 5 && (

            <div>

              <div className="mb-8">

                <h2 className="text-2xl font-bold text-gray-900">

                  Almost there! 👋

                </h2>


                <p className="text-gray-500 mt-2">

                  Just choose the maximum number of pages you prefer.

                </p>

              </div>


              <h2 className="text-2xl font-bold text-gray-900">

                How long should the book be?

              </h2>


              <p className="text-gray-500 mt-2">

                Choose the maximum number of pages you prefer.

              </p>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                {[200, 300, 500, 1000].map((pages) => (

                  <button
                    key={pages}
                    onClick={() =>
                      setAnswers({
                        ...answers,
                        maxPages: pages,
                      })
                    }
                    className={`p-4 border rounded-xl text-left ${
                      answers.maxPages === pages
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 hover:border-indigo-400"
                    }`}
                  >

                    Up to {pages} pages

                  </button>

                ))}

              </div>

            </div>

          )}


          {/* Navigation */}

          <div className="flex justify-between mt-10">

            {step > 1 ? (

              <button
                onClick={previousStep}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
              >

                ← Back

              </button>

            ) : (

              <div></div>

            )}


            {step < 5 ? (

              <button
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >

                Next →

              </button>

            ) : (

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >

                {submitting
                  ? "Saving..."
                  : "Find My Books"}

              </button>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Questionnaire;