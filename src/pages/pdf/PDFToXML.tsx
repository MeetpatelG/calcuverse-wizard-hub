
import React, { useState } from "react";
import { LoaderCircle, FileDown, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";
// Set the worker source using CDN (important for vite/parcel/react setups)
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

// Utility: extract text content and produce naive XML wrapping
function simplePDFTextToXML(text: string): string {
  // Split into lines, wrap each in <line> tags (very naive for now)
  const lines = text.split("\n").map(l => l.trim()).filter(Boolean);
  const xmlLines = lines.map(line =>
    `<line>${line
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</line>`
  ).join("\n  ");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<pdf>\n  ${xmlLines}\n</pdf>`;
}

export default function PDFToXML() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [xmlData, setXmlData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setXmlData(null);
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

      // Convert to simple XML (naive)
      const xml = simplePDFTextToXML(allText);
      setXmlData(xml);
    } catch (err) {
      setError("Failed to extract XML from PDF. Not all PDFs are supported.");
      setXmlData(null);
    }
    setLoading(false);
  }

  function handleDownloadXML() {
    if (!xmlData) return;
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.xml";
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
              <CardTitle>PDF to XML Converter</CardTitle>
            </div>
            <CardDescription>
              Extract content from PDF files and export as a basic XML document.
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
              {xmlData && (
                <>
                  <div className="bg-muted rounded p-3 text-sm mb-2 max-h-44 overflow-auto">
                    <strong>Preview (first 15 lines):</strong>
                    <pre className="text-xs whitespace-pre-wrap mt-2">
                      {xmlData.split("\n").slice(0, 15).join("\n")}
                      {xmlData.split("\n").length > 15 ? "\n..." : ""}
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="w-full"
                    onClick={handleDownloadXML}
                  >
                    <FileDown className="mr-1" />
                    Download XML
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
