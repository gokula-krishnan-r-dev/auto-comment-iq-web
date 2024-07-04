import { useAuth } from "@/components/provider/AuthProvider";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "@/lib/axios";
import React from "react";
import { useQuery } from "react-query";
import { toast } from "sonner";

const DailyCard = ({ ideas }: any) => {
  const { authId } = useAuth();
  const { data: savedideas, refetch } = useQuery("savedideas", async () => {
    const res = await axios.get(`/daily/ideas/save/${authId}`);
    return res.data.ideas;
  });
  const handletoSaveIdea = async (ideaId: any, isAccepted: boolean) => {
    const response = await axios.post(`/daily/ideas/save/${ideaId}/${authId}`, {
      isAccepted: isAccepted,
    });
    await response.data;
    refetch();
    if (response.status === 201 && response.data.SaveIdea.isAccepted) {
      toast.success("Idea saved successfully");
    } else {
      toast.error("Disapproved");
    }
  };

  return (
    <div className="pt-8">
      <ScrollArea className="max-h-[500px]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea: any, index: any) => (
            <div
              key={index}
              className="bg-white border rounded-3xl p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{idea.name}</h2>
                <p className="text-gray-600 mb-2"> {idea.lead.name}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500"> {idea.status}</p>
                  <div
                    className="inline-flex items-center rounded-full whitespace-nowrap border px-2.5 py-0.5 w-fit text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary bg-gray-100 hover:bg-secondary/80"
                    data-id={idea.id}
                  >
                    🚀
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => handletoSaveIdea(idea.id, true)}
                  className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => handletoSaveIdea(idea.id, false)}
                  className="bg-red-500 text-white font-semibold px-4 py-2 rounded-full"
                >
                  Disapprove
                </button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DailyCard;
