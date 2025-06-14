
import React, { useState } from "react";
import { LoaderCircle, FileDown, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.entry";

// Simple utility: extract text (not perfect for all table formats)
function parseTableFromText(text: string): string[][] {
  // Simple: split by lines and spaces/tabs (works for well-aligned data)
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  // Try splitting by whitespace for each line
  return lines.map(line =>
    line.split(/\s{2,}|\t|,/g).map(cell => cell.trim())
  );
}

function arrayToCSV(data: string[][]): string {
  return data
    .map(
      (row) =>
        row
          .map((cell) =>
            cell.includes(",") || cell.includes('"') || cell.includes("\n")
              ? `"${cell.replace(/"/g, '""')}"`
              : cell
          )
          .join(",")
    )
    .join("\r\n");
}

export default function PDFToCSV() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [csvData, setCsvData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCsvData(null);
    setError(null);
    const file = e.target.files?.[0];
    setPdfFile(file || null);
    if (!file) return;
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let allText = '';
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const txtContent = await page.getTextContent();
        const pageText = txtContent.items.map((i: any) => i.str).join(" ");
        allText += pageText + "\n";
      }

      // Parse to 2D array (naive approach)
      const tableData = parseTableFromText(allText);
      const csv = arrayToCSV(tableData);
      setCsvData(csv);
    } catch (err) {
      setError("Failed to extract tables from PDF. Not all PDFs are supported.");
      setCsvData(null);
    }
    setLoading(false);
  }

  function handleDownloadCSV() {
    if (!csvData) return;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex gap-3 items-center mb-1">
              <FileDown className="h-8 w-8 text-primary" />
              <CardTitle>PDF to CSV Converter</CardTitle>
            </div>
            <CardDescription>
              Extract tabular data from PDF files and save it as a CSV spreadsheet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!pdfFile) {
                  setError("Please select a PDF file.");
                }
              }}
              className="space-y-6"
            >
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="block w-full border border-input rounded py-2 px-3 mb-2"
                disabled={loading}
              />
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <LoaderCircle className="animate-spin" /> Processing your PDF...
                </div>
              )}
              {error && (
                <div className="text-destructive text-sm">{error}</div>
              )}
              {csvData && (
                <>
                  <div className="bg-muted rounded p-3 text-sm mb-2 max-h-44 overflow-auto">
                    <strong>Preview (first 10 rows):</strong>
                    <pre className="text-xs whitespace-pre-wrap mt-2">
                      {csvData.split("\n").slice(0, 10).join("\n")}
                      {csvData.split("\n").length > 10 ? "\n..." : ""}
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="w-full"
                    onClick={handleDownloadCSV}
                  >
                    <FileDown className="mr-1" />
                    Download CSV
                  </Button>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
