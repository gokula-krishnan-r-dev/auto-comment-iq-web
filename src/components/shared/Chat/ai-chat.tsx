import React, { useState } from "react";
import axios from "axios";

const AiChat: React.FC<any> = ({ setMessage }: any) => {
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const apiUrl = `https://autocommentapi.vercel.app/api/llama2?message=${encodeURIComponent(
        inputMessage
      )}`;
      const result = await axios.get(apiUrl);

      // Assuming the response is a text message from the AI
      const aiResponse = result.data;
      setChatHistory([
        ...chatHistory,
        // `You: ${inputMessage}`,
        `AI: ${aiResponse.response}`,
      ]);

      // Clear the input field
      setInputMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error.message);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  return (
    <div className="">
      <div className="w-full p-6">
        <div className="text-2xl font-semibold mb-4">AI Chat</div>
        <div className="mb-4">
          {chatHistory.map((message, index) => (
            <div key={index} className="mb-2">
              {message}
              <button
                onClick={() => {
                  setMessage(message.split(":")[1].trim());
                }}
                className="px-3 py-2 rounded-full bg-gray-100 text-xs font-semibold ml-3"
              >
                Add
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 pl-4 border border-gray-300 rounded-full mr-2"
          />
          <button
            onClick={handleSendMessage}
            className="px-4 py-3 bg-gray-100 text-xs font-semibold hover:border rounded-full hover:bg-white duration-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
