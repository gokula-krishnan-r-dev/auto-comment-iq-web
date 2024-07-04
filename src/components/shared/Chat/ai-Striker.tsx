import React, { useState } from "react";
import { Send } from "lucide-react";
import axios from "@/lib/axios";

interface AiStrikerProps {
  handleImages: (images: string[]) => void;
}

const AiStriker: React.FC<AiStrikerProps> = ({ handleImages }) => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<any | null>(null);

  const fetchData = async () => {
    try {
      const apiUrl = `/api/striker?message=${encodeURIComponent(message)}`;
      const result = await axios.get(apiUrl);

      // Assuming the response is an array of image URLs
      // handleImages(result.data);

      // Set the response for display or further processing
      setResponse(result.data);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      // Handle error appropriately, e.g., show an error message to the user
      setResponse("Error fetching data. Please try again.");
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold mb-4">AI Striker</div>
      {response?.response?.thumbnailUrl && (
        <div>
          <img
            className="rounded-3xl w-40 h-40 object-cover"
            src={response?.response?.thumbnailUrl}
            alt="striker"
          />
        </div>
      )}
      <div className="py-4 flex items-center gap-2">
        <input
          className="px-4 py-2 rounded-full border border-gray-300 w-full "
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button
          className="border px-4 py-2 rounded-full"
          onClick={() => fetchData()}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default AiStriker;
