import React, { ChangeEvent, FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { Paperclip, X } from "lucide-react";
import FileDrag from "./FileDrag";
import Image from "next/image";
import { useChat } from "@/components/provider/ChatProvider";
import { DialogClose } from "@/components/ui/dialog";
import { reFetchChat } from "@/lib/chatLib";
const DialogModel = dynamic(() => import("../Dashboard/DialoagModel"), {
  ssr: false,
});

const AddStriker = dynamic(
  () => import("@/components/shared/Chat/AddStriker"),
  {
    ssr: false,
  }
);

interface ChatInputProps {
  fileSelected: (event: ChangeEvent<HTMLInputElement>) => void;
  fileRef: React.RefObject<HTMLInputElement>;
  message: string;
  handleInput: (event: ChangeEvent<HTMLInputElement>) => void;
  handleForm: (event: FormEvent) => void;
  typing: boolean;
  handleImages: () => void;
  authId: string;
  setMessage: (message: string) => void;
  socket: any;
  roomId: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  handleInput,
  handleForm,
  typing,
  handleImages,
  setMessage,
  authId,
  socket,
  roomId,
}) => {
  const { setChat } = useChat();
  const [file, setFile] = useState<any>(null);
  const { isReplying, setIsReplying } = useChat();
  const handleToSendMessage = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file[0]);
      const response = await fetch(`http://localhost:3000/v1/message/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        response.json().then((data) => {
          socket.emit("send-message", {
            message,
            roomId,
            userId: authId,
            image: data.filePath,
            type: "image",
            image_text: message,
          });
        });
        reFetchChat({ setChat, roomId });
      } else {
        console.error("Failed to submit files to the API.");
      }
    }
  };

  return (
    <section className="relative  duration-500 px-4 bg-white py-2 lg:px-3 pb-2 rounded-b-3xl pt-2">
      {isReplying?.[0]?.messageId && (
        <div className="absolute  duration-500 bg-gray-100 z-50 mx-4 py-3 rounded-3xl right-0 left-0 px-4 -top-20 z-50">
          <div className="">
            <button
              className="absolute right-8 top-5"
              onClick={() => setIsReplying([])}
            >
              <X />
            </button>
            <div className="bg-white px-4 py-2 rounded-xl border-l-8 border-green-400">
              <h4 className="text-xs font-semibold">
                {isReplying[0]?.username}
              </h4>
              <div className="">
                <p className="line-clamp-1 text-xs font-medium mt-2">
                  {isReplying[0]?.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleForm}>
        {typing && <p className="text-white font-semibold mt-2">Typing...</p>}
        <div className="bg-gray-100 border py-2 rounded-3xl px-4">
          <div className="flex bg-transparent items-center gap-2 w-full">
            <input
              type="text"
              value={message}
              onChange={handleInput}
              className="w-full bg-transparent before:bg-transparent before:border-none border-none outline-none rounded-2xl text-base font-medium"
              placeholder="Message to Subscribers"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <DialogModel
                button={
                  <div>
                    <Paperclip />
                  </div>
                }
              >
                <div className="">
                  {!file ? (
                    <FileDrag setFile={setFile}>
                      <div className="">
                        <h1 className="text-base font-semibold">Add Story</h1>
                        <div className="flex items-center justify-center">
                          <img
                            className="w-[80%]"
                            src="/images/Folder.gif"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-center">
                          <p className="text-sm text-gray-500">
                            Drag and drop your Image or Video here
                          </p>
                        </div>
                      </div>
                    </FileDrag>
                  ) : (
                    <div className="">
                      <div className="pb-4">
                        {file[0]?.type?.startsWith("image/") ? (
                          <Image
                            objectFit="cover"
                            width={500}
                            height={500}
                            className="rounded-3xl h-full w-full"
                            src={URL.createObjectURL(file[0])}
                            alt=""
                          />
                        ) : file[0]?.type?.startsWith("video/") ? (
                          <video controls>
                            <source
                              src={URL.createObjectURL(file[0])}
                              type={file[0]?.type}
                            />
                          </video>
                        ) : (
                          <p>Unsupported file type</p>
                        )}
                      </div>
                      <div className="">
                        <div>
                          <label
                            htmlFor="hs-feedback-post-comment-textarea-1"
                            className="block mb-2 text-sm font-medium dark:text-white"
                          >
                            Enter a Message
                          </label>
                          <div className="mt-1">
                            <textarea
                              onChange={(e) => setMessage(e.target.value)}
                              id="hs-feedback-post-comment-textarea-1"
                              name="hs-feedback-post-comment-textarea-1"
                              rows={3}
                              className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                              placeholder="Leave your comment here..."
                            ></textarea>
                          </div>
                        </div>
                        <DialogClose
                          onClick={handleToSendMessage}
                          className="mt-4 justify-end flex items-center ml-auto"
                        >
                          Send
                        </DialogClose>
                      </div>
                    </div>
                  )}
                </div>
              </DialogModel>
              <AddStriker setMessage={setMessage} handleImages={handleImages} />
            </div>
            <button
              className="px-4 py-1  rounded-full bg-gray-800 text-white hover:bg-gray-700 transition duration-300"
              type="submit"
            >
              Send
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ChatInput;
