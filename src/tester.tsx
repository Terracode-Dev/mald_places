import { useEffect } from "react";

import { CheckAuth } from "../firebase";
import "./App.css";
import ExcelUploader from "./utils/exceluploader";

export default function Tester() {
  useEffect(() => {
    async function getDocs() {
      const ISLAND = await CheckAuth("admin", "pass");
      console.log("Isalnds", ISLAND);
    }
    getDocs();
  }, []);

  return (
    <>
      <ExcelUploader />

      <h1>TEST</h1>
    </>
  );
}
