import api from "../api";

// Save reading profile
export const saveReadingProfile = (profileData) => {
  const token = localStorage.getItem("smartbook_token");

  return api.post(
    "/users/reading-profile",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// Get reading profile
export const getReadingProfile = (email) => {
  return api.get(`/users/reading-profile/${email}`);
};