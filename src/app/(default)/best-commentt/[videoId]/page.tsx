"use client";
import CommentCard from "@/components/shared/Comments/CommentCard";
import { Button } from "@/components/ui/button";
import { CardHeader, CardFooter, Card } from "@/components/ui/card";
import Error from "@/components/ui/error";
import Loading from "@/components/ui/loading";
import axios from "@/lib/axios";
import { useQuery } from "react-query";
import { toast } from "sonner";

export default function Page() {
  const getNegativeComments = async () => {
    const response = await axios.get("/negative/comments?videoId=Fk-LOFBZo9o");
    if (response.status !== 200) {
      toast.error("Failed to fetch negative comments");
    }

    return response.data;
  };
  const { data, isLoading, isError } = useQuery(
    "negativeComments",
    getNegativeComments
  );
  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <Card className="w-full capitalize max-w-lg mx-auto">
      <CardHeader className="flex items-start p-6 gap-4">
        <div className="flex items-center gap-2">
          <YoutubeIcon className="w-6 h-6 text-red-500" />
          <h2 className="text-lg font-bold">
            Vercel Ship Keynote: Introducing the frontend cloud
          </h2>
        </div>
        <Button size="sm">Delete</Button>
      </CardHeader>
      {data?.comment?.map((comment: any, index: number) => (
        <CommentCard comment={comment} index={index} key={index} />
      ))}
      <CardFooter className="p-6">
        <Button onClick={undefined} size="sm" variant="outline">
          Delete Comment All Comment From you tube
        </Button>
      </CardFooter>
    </Card>
  );
}

function YoutubeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}
