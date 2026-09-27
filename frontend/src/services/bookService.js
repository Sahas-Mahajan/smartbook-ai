import api from "../api";

export const getBooks = (params = {}) => {
  return api.get("/books", {
    params: params,
  });
};