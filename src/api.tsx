import axios from "axios";

export const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;

const url = "https://api.themoviedb.org/3/";
export const api = axios.create({
  baseURL: url,
});
