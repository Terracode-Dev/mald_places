import { useState, useEffect } from "react";

import { getDocumentById } from "../firebase";
import "./App.css";
import ExcelUploader from "./utils/exceluploader";

export default function Tester() {
  useEffect(() => {
    async function getDocs() {
      const ISLAND = await getDocumentById("islands", "AFKBNXQo4235DXwfeoLO");
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
