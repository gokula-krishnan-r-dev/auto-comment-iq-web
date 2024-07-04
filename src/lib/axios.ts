// @ts-nocheck

import Axios from "axios";

// Immediately-invoked function to determine if we are server-side
const axios = Axios.create({
  // baseURL: "http://localhost:3000/v1",
  baseURL: "https://autocommentapi.vercel.app/v1",
});

export default axios;
