import React, { useRef } from "react";

interface StoryPopupProps {
  children: React.ReactNode;
  setFile: any;
}

const FileDrag: React.FC<StoryPopupProps> = ({ children, setFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    setFile(files);
    // if (files.length > 0) {
    //   console.log(files);

    //   // Create FormData
    //   const formData = new FormData();
    //   for (let i = 0; i < files.length; i++) {
    //     const file = files[i];
    //     formData.append("files", file);

    //     // Check file type and append type to FormData
    //     if (file.type.includes("image")) {
    //       formData.append("types", "image");
    //     } else if (file.type.includes("video")) {
    //       formData.append("types", "video");
    //     }
    //   }

    //   try {
    //     const response = await fetch(
    //       "http://localhost:3001/livechat/XZTzOOiJPic#65e5d3a57c8047f5104d11bf",
    //       {
    //         method: "POST",
    //         body: formData,
    //       }
    //     );

    //     if (response.ok) {
    //       console.log("Files successfully submitted to the API.");
    //     } else {
    //       console.error("Failed to submit files to the API.");
    //     }
    //   } catch (error) {
    //     console.error("Error submitting files to the API:", error);
    //   }
    // }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files: any = e.target.files;
    setFile(files);
    if (files.length > 0) {
      // console.log(files);
      // const formData = new FormData();
      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i];
      //   formData.append("files", file);
      //   // Check file type and append type to FormData
      //   if (file.type.includes("image")) {
      //     formData.append("types", "image");
      //   } else if (file.type.includes("video")) {
      //     formData.append("types", "video");
      //   } else {
      //     formData.append("types", "other");
      //   }
      // }
      // try {
      //   const response = await fetch("http://localhost:3000/", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   if (response.ok) {
      //     console.log("Files successfully submitted to the API.");
      //     // Add any further logic or update UI as needed
      //   } else {
      //     console.error("Failed to submit files to the API.");
      //   }
      // } catch (error) {
      //   console.error("Error submitting files to the API:", error);
      // }
    }
  };

  const openFileChooser = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      className="border cursor-pointer border-gray-300 rounded-3xl p-4"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="mb-4">
        {React.cloneElement(
          React.Children.only(children) as React.ReactElement,
          {
            onClick: openFileChooser,
          }
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default FileDrag;
