import axios from "axios";

const API_URL = "http://localhost:5000/api/recommendations";

export const getRecommendations = (email) => {
  return axios.post(API_URL, {
    email: email,
  });
};