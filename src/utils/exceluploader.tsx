// First, install SheetJS via npm:
// npm install xlsx
import { useState } from "react";
import * as XLSX from "xlsx";

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
  const [excelData, setExcelData] = useState<any>(null);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    try {
      const data = await parseExcelFile(file);
      setExcelData(data);
      console.log(data); // Array of objects
    } catch (error) {
      console.error("Error parsing Excel file:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {excelData && (
        <div>
          {/* Display or process your data here */}
          <pre>{JSON.stringify(excelData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
