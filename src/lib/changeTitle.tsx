import { apiKey } from "@/components/shared/Dashboard/VideoSection";
import axios from "axios";
import { toast } from "sonner";

export const updateVideoDetails = async (
  title: any,
  id: any,
  accessToken: any,
  description: any,
  tags: any
) => {
  const url =
    "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,status,localizations";

  const videoId = id;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const data = {
    id: videoId,
    snippet: {
      categoryId: 22,
      defaultLanguage: "en",
      description: description,
      tags: tags,
      title: title,
    },
    // localizations: {
    //   es: {
    //     title: "no hay nada a ver aqui",
    //     description: "Esta descripcion es en español.",
    //   },
    // },
  };

  try {
    const response = await axios.put(`${url}`, data, {
      headers,
    });
    console.log("Video details updated successfully:", response.data);
    toast.success("Video details updated successfully");
  } catch (error: any) {
    toast.error(error.response.data.error.message);
  }
};
