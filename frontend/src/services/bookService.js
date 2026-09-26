import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

export const getBooks = (params = {}) => {
  return axios.get(API_URL, {
    params: params,
  });
};