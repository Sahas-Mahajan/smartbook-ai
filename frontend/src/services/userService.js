import axios from "axios";

const API_URL = "http://localhost:5000/api/users";


// Save reading profile
export const saveReadingProfile = (profileData) => {

  const token =
    localStorage.getItem("smartbook_token");

  return axios.post(
    `${API_URL}/reading-profile`,
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

  return axios.get(
    `${API_URL}/reading-profile/${email}`
  );

};