
import React, { useState } from "react";
import { LoaderCircle, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export default function PDFToTextTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [txtData, setTxtData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTxtData(null);
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
      setTxtData(allText);
    } catch (err) {
      setError("Text extraction failed. PDF may not be supported.");
    }
    setLoading(false);
  }

  function handleDownloadTXT() {
    if (!txtData) return;
    const blob = new Blob([txtData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "output.txt";
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
              <CardTitle>PDF to Text Converter</CardTitle>
            </div>
            <CardDescription>
              Extract raw text from PDF documents for easier copy-paste.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
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
              {error && <div className="text-destructive text-sm">{error}</div>}
              {txtData && (
                <>
                  <div className="bg-muted rounded p-3 text-sm mb-2 max-h-44 overflow-auto">
                    <strong>Preview (first 10 lines):</strong>
                    <pre className="text-xs whitespace-pre-wrap mt-2">
                      {txtData.split("\n").slice(0, 10).join("\n")}
                      {txtData.split("\n").length > 10 ? "\n..." : ""}
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="w-full"
                    onClick={handleDownloadTXT}
                  >
                    <FileDown className="mr-1" />
                    Download TXT
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
