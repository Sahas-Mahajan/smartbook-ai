import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [verificationCode, setVerificationCode] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError(
        "Email information is missing. Please register again."
      );
      return;
    }

    if (!/^\d{6}$/.test(verificationCode)) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/verify-email",
        {
          email,
          verificationCode,
        }
      );

      setSuccess(
        response.data.message ||
          "Email verified successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <div className="text-center mb-8">
          <div className="text-5xl mb-4">
            ✉️
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Verify Your Email
          </h1>

          <p className="text-gray-500 mt-3">
            We've sent a 6-digit verification code to:
          </p>

          <p className="font-semibold text-indigo-600 mt-2 break-all">
            {email || "your Gmail address"}
          </p>
        </div>

        <form onSubmit={handleVerify}>

          <label
            htmlFor="verificationCode"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Verification Code
          </label>

          <input
            id="verificationCode"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, "");

              setVerificationCode(value);
            }}
            placeholder="Enter 6-digit code"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 bg-green-50 border border-green-200 text-green-600 rounded-lg px-4 py-3 text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading
              ? "Verifying..."
              : "Verify Email"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          The verification code is valid for 10 minutes.
        </p>

      </div>
    </div>
  );
}

export default VerifyEmail;