import { useAuth } from "@/components/provider/AuthProvider";
import { sendReply } from "@/lib/postComment";
import { FilePenLine, RotateCw } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { EditComment } from "./edit-comment";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function processText(
  text: string,
  options: { dynamicResponse: boolean }
): string {
  // Remove empty strings from the text
  let processedText = text.replace(/"/g, "");

  // Return the processed text
  return processedText;
}

function AiResponseView({ response, commentId }: any) {
  const [hover, setHover] = React.useState(false);
  const [editComment, setEditComment] = React.useState<any>();
  const { accessToken } = useAuth();
  async function handlePostComment(inputValue: string) {
    try {
      const postComment = await sendReply(commentId, inputValue, accessToken);
      console.log("Comment posted:", postComment);
      toast.success("Comment posted successfully");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative duration-500  max-w-max"
    >
      <button
        onClick={() => handlePostComment(response)}
        className="bg-gray-100 px-4 py-2 text-start rounded-xl mt-3"
      >
        {processText(response, { dynamicResponse: true })}
      </button>
      {true && (
        <div className="absolute right-2 flex items-center gap-2 -top-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
            <RotateCw className="w-4 h-4  bg-white rounded-full " />
          </button>
          <EditComment
            button={
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white">
                <FilePenLine className="w-4 h-4  bg-white rounded-full " />
              </button>
            }
          >
            <div className="">
              <DialogHeader>
                <DialogTitle>Edit Ai Response Reply</DialogTitle>
                <DialogDescription>
                  Edit the Ai Response reply and click save changes
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="capitalize">
                  <Label htmlFor="name" className="text-right">
                    ai response
                  </Label>
                  <Input
                    name="response"
                    onChange={(e) => setEditComment(e.target.value)}
                    id="response"
                    defaultValue={response}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onChange={(e) => handlePostComment(editComment)}
                  type="submit"
                >
                  Save changes
                </Button>
              </DialogFooter>
            </div>
          </EditComment>
        </div>
      )}
    </div>
  );
}
export default AiResponseView;
