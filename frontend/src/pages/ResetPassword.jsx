import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email) {
      setError(
        "Email information is missing. Please start the password reset process again."
      );
      return;
    }

    if (!/^\d{6}$/.test(resetCode)) {
      setError(
        "Please enter a valid 6-digit reset code."
      );
      return;
    }

    if (newPassword.length < 6) {
      setError(
        "New password must be at least 6 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        "New password and confirm password do not match."
      );
      return;
    }

    try {
      setLoading(true);

      // First verify the reset code
      await api.post(
        "/auth/verify-reset-code",
        {
          email,
          resetCode,
        }
      );

      // Then reset the password
      const response = await api.post(
        "/auth/reset-password",
        {
          email,
          resetCode,
          newPassword,
        }
      );

      if (response.data.success) {
        setSuccess(
          "Password reset successfully. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to reset password. Please try again."
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
            🔑
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Reset Password
          </h1>

          <p className="text-gray-500 mt-3">
            Enter the 6-digit code sent to:
          </p>

          <p className="font-semibold text-indigo-600 mt-2 break-all">
            {email || "your Gmail address"}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Reset Code */}
          <div className="mb-5">
            <label
              htmlFor="resetCode"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Verification Code
            </label>

            <input
              id="resetCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={resetCode}
              onChange={(e) => {
                const value = e.target.value.replace(
                  /\D/g,
                  ""
                );

                setResetCode(value);
              }}
              placeholder="Enter 6-digit code"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* New Password */}
          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              New Password
            </label>

            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(e.target.value)
              }
              placeholder="Minimum 6 characters"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Re-enter your new password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 bg-green-50 border border-green-200 text-green-600 rounded-lg px-4 py-3 text-sm">
              {success}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-indigo-600 font-semibold hover:underline"
        >
          ← Back to Login
        </button>

      </div>
    </div>
  );
}

export default ResetPassword;