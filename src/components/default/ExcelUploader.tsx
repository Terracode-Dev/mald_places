import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function ExcelFileUploader() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (selectedFile) {
      // Process the file here
      console.log("Submitting file:", selectedFile);
    } else {
      alert("No file selected");
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Clickable Div */}
      <div
        onClick={() => document.getElementById("file-input")?.click()}
        className="border border-dashed w-full border-secondary rounded-lg p-4 text-center cursor-pointer hover:bg-secondary"
      >
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : (
          <p>Click here to upload an Excel file</p>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        id="file-input"
        accept=".xlsx, .xls"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Submit Button */}
      {selectedFile && (
        <Button
          onClick={handleSubmit}
        >
          Submit Excel
        </Button>
      )}
    </div>
  );
}
