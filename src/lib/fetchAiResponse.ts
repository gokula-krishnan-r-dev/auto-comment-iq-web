// utils/fetchAiResponse.ts
import axios from "axios";

export const fetchAiTitle = async (title: string) => {
  try {
    const response = await axios.get(
      `https://autocommentapi.vercel.app/api/ai-title?message=${title}`
    );
    return response.data.response; // Adjust this based on your AI response format
  } catch (error) {
    throw new Error("Failed to fetch AI response");
  }
};
