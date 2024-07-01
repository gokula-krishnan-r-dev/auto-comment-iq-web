import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { sendReply } from "@/lib/postComment";
import { toast } from "sonner";
import { useAuth } from "@/components/provider/AuthProvider";
const InputComment = ({ videoId }: any) => {
  const { accessToken } = useAuth();
  const [inputValue, setInputValue] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const postComment = async () => {
    try {
      const postComment = await sendReply(videoId, inputValue, accessToken);
      console.log("Comment posted:", postComment);
      if (postComment) {
        setSuccess(true);
      }
      toast.success("Comment posted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="font-xs font-semibold">Reply</button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="pb-12">
          {!success ? (
            <div className="relative">
              <textarea
                onKeyDown={(e) => e.key === "Enter" && postComment()}
                onChange={(e) => setInputValue(e.target.value)}
                className="p-4 pb-12 block w-full border border-gray-200 rounded-3xl text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Enter a reply Comment..."
                defaultValue={""}
              />
              {/* Toolbar */}
              <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-slate-900">
                <div className="flex justify-between items-center">
                  {/* Button Group */}
                  <div className="flex items-center">
                    {/* Mic Button */}
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width={18} height={18} x={3} y={3} rx={2} />
                        <line x1={9} x2={15} y1={15} y2={9} />
                      </svg>
                    </button>
                    {/* End Mic Button */}
                    {/* Attach Button */}
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </button>
                    {/* End Attach Button */}
                  </div>
                  {/* End Button Group */}
                  {/* Button Group */}
                  <div className="flex items-center gap-x-1">
                    {/* Mic Button */}
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:text-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1={12} x2={12} y1={19} y2={22} />
                      </svg>
                    </button>
                    {/* End Mic Button */}
                    {/* Send Button */}
                    <button
                      type="button"
                      className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="flex-shrink-0 size-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                      </svg>
                    </button>
                    {/* End Send Button */}
                  </div>
                  {/* End Button Group */}
                </div>
              </div>
              {/* End Toolbar */}
            </div>
          ) : (
            <div className="">Success Comment</div>
          )}
        </div>
        <DialogClose>
          <button className="font-xs font-semibold">Close</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InputComment;
