// @ts-nocheck

import Axios from "axios";
export const apiUrl = "http://localhost:3000/v1";

// Immediately-invoked function to determine if we are server-side
const axios = Axios.create({
  baseURL: apiUrl,
});

export default axios;
