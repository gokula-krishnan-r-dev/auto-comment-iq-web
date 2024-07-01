import axios from "axios";

export const sendReply = async (
  parentId: any,
  replyText: any,
  accessToken?: any
) => {
  const data = {
    snippet: {
      textOriginal: replyText,
      parentId: parentId,
    },
  };

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/comments?part=snippet,id`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error sending reply:", error);
  }
};
