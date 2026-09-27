import api from "../api";

export const getRecommendations = (email) => {
  return api.post("/recommendations", {
    email: email,
  });
};