import { useAuth } from "@/components/provider/AuthProvider";
import axios from "axios";
import { Bookmark } from "lucide-react";
import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const JobCards = ({ jobads, setActiveJob, refetch }: any) => {
  const { authId } = useAuth();
  const queryClient = useQueryClient();
  const getBookmark = async () => {
    const res = await fetch(
      `http://localhost:3000/v1/jobads/bookmarks/${authId}`
    );
    return res.json();
  };

  const {
    data: bookmarks,
    isLoading,
    refetch: refetchBookmarks,
  } = useQuery("bookmark", getBookmark);

  const handleSaveBookmark = async (jobId: any) => {
    const response = await axios.post(
      "http://localhost:3000/v1/jobads/bookmarks",
      {
        user: authId,
        userId: authId,
        bookmarks: jobId,
      }
    );

    if (response.data.code === 201 || response.data.code === 200) {
      refetchBookmarks();
      toast.success(response.data.message);
      queryClient.setQueryData("bookmark", (oldData: any) => {
        return [...oldData, { bookmarks: { _id: jobId } }];
      });
    } else {
      refetchBookmarks();
      toast.error("Bookmark not created successfully");
      queryClient.setQueryData("bookmark", (oldData: any) => {
        return [...oldData, { bookmarks: { _id: jobId } }];
      });
    }
  };

  return (
    <div>
      <div className="mt-8 rounded-3xl">
        {jobads?.map((job: any, index: any) => {
          const isBookmarked = bookmarks?.some((bookmark: any) => {
            return bookmark.bookmarks?._id === job._id;
          });

          return (
            <div
              onClick={() => setActiveJob(index)}
              key={job?.id}
              className="bg-gray-100 mb-4 rounded-3xl p-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex capitalize items-center gap-2">
                  <img
                    src="https://marketplace.canva.com/EAFauoQSZtY/1/0/1600w/canva-brown-mascot-lion-free-logo-qJptouniZ0A.jpg"
                    alt="logo"
                    className="w-16 h-16 rounded-3xl"
                  />
                  <div>
                    <p className="text-sm font-semibold line-clamp-1">
                      {job?.companyName}
                    </p>
                    <h1 className="text-xl font-semibold line-clamp-1">
                      {job?.title}
                    </h1>
                    <p className="text-gray-500">{job?.company?.name}</p>
                    <div className="">
                      <p className="text-[10px] line-clamp-1 capitalize font-medium text-gray-500">
                        {job?.user?.username} - online
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <button
                    className=""
                    onClick={() => handleSaveBookmark(job?._id)}
                  >
                    <Bookmark fill={isBookmarked ? "black" : "none"} />
                  </button>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex items-center py-2 gap-2">
                  <JobDetails job={job} />
                </div>
                <p className="mb-3 line-clamp-2 text-gray-500 dark:text-gray-400">
                  {job?.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobCards;
interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  return (
    <button className="text-xs font-semibold bg-gray-800 text-white rounded-full px-4 py-2">
      {label}
    </button>
  );
};

interface Job {
  type: string;
  pricePerVideo: number;
  category: string;
}

interface JobDetailsProps {
  job: Job;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {
  const { type, pricePerVideo, category } = job;

  return (
    <div className="gap-2 flex items-center flex-wrap">
      <Button label={type} />
      <Button label={`$ ${pricePerVideo} / per video`} />
      <Button label={category} />
    </div>
  );
};
