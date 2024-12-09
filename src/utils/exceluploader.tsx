import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as XLSX from "xlsx";
import { addMultipleDocuments } from "../../firebase";
function parseExcelFile(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        // Read the file
        const workbook = XLSX.read(event.target?.result, { type: "binary" });

        // Get the first sheet name
        const firstSheetName = workbook.SheetNames[0];

        // Convert sheet to JSON
        const worksheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        resolve(jsonData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // Read the file as binary string
    reader.readAsBinaryString(file);
  });
}

// Example usage in a React component
export default function ExcelUploader() {
  const [isAdding, setIsAdding] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsAdding(true);
    const file = event.target.files?.[0];

    if (file) {
      try {
        const data: any = await parseExcelFile(file);

        const columns = Object.values(data[0]);
        const records = data
          .map((dt: any, i: number) => {
            if (i !== 0) {
              const Doc: Record<string, any> = {};
              const rowValues = Object.values(dt);
              for (let col = 0; col < rowValues.length; col++) {
                const key = (columns[col] as any).replace(/\s+/g, "");
                Doc[key] = rowValues[col];
              }
              return Doc;
            }
          })
          .filter((record: any) => record !== undefined);
        console.log(records);
        try {
          await addMultipleDocuments("islands", records);
        } catch (e: any) {
          console.error("erro adding excel records to firebase", e);
        }
        setIsOpen(false);
        // Array of objects
      } catch (error) {
        console.error("Error parsing Excel file:", error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Import</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[570px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Islands</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
          />
          <button
            onClick={triggerFileInput}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isAdding ? "Uploading" : "Upload Excel"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
