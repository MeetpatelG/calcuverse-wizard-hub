
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, FileDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function WordToPDFTool() {
  const [wordFile, setWordFile] = useState<File | null>(null);
  const [pdfReady, setPdfReady] = useState<boolean>(false);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPdfReady(false);
    setPdfDataUrl(null);
    setError(null);
    const file = e.target.files?.[0];
    setWordFile(file || null);
    if (!file) return;
    setLoading(true);
    try {
      // Placeholder: just wrap contents as PDF text using Blob
      const text = await file.text();
      const pdfBlob = new Blob(
        [
          "%PDF-1.3\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >> endobj\n2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >> endobj\n3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] /Contents 4 0 R >> endobj\n4 0 obj\n<< /Length ",
          text.length.toString(),
          " >>stream\nBT /F1 18 Tf 40 100 Td (" +
            text
              .replace(/\(|\)/g, "")
              .replace(/\r?\n/g, "\\n") +
            ") Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000010 00000 n \n0000000063 00000 n \n0000000121 00000 n \n0000000278 00000 n \ntrailer\n<< /Root 1 0 R /Size 5 >>\nstartxref\n400\n%%EOF",
        ],
        { type: "application/pdf" }
      );
      const url = URL.createObjectURL(pdfBlob);
      setPdfDataUrl(url);
      setPdfReady(true);
    } catch (err) {
      setError("Conversion failed. Only demo text export is supported for now.");
    }
    setLoading(false);
  }

  function handleDownloadPDF() {
    if (!pdfDataUrl) return;
    const link = document.createElement("a");
    link.href = pdfDataUrl;
    link.download = "output.pdf";
    link.click();
    setTimeout(() => {
      URL.revokeObjectURL(pdfDataUrl);
    }, 1000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex gap-3 items-center mb-1">
              <FileDown className="h-8 w-8 text-primary" />
              <CardTitle>Word to PDF Converter</CardTitle>
            </div>
            <CardDescription>
              Convert Word (.docx/.doc) files to a simple PDF (text only support for now).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6" onSubmit={e => e.preventDefault()}>
              <input
                type="file"
                accept=".docx,.doc,text/plain"
                onChange={handleFileChange}
                className="block w-full border border-input rounded py-2 px-3 mb-2"
                disabled={loading}
              />
              {loading && (
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <LoaderCircle className="animate-spin" /> Processing your DOCX...
                </div>
              )}
              {error && <div className="text-destructive text-sm">{error}</div>}
              {pdfReady && pdfDataUrl && (
                <>
                  <div className="bg-muted rounded p-3 text-sm mb-2 max-h-44 overflow-auto">
                    <strong>Preview:</strong>
                    <pre className="text-xs whitespace-pre-wrap mt-2">
                      Currently exports only raw file text as a PDF. Better formatting coming soon!
                    </pre>
                  </div>
                  <Button
                    type="button"
                    variant="default"
                    className="w-full"
                    onClick={handleDownloadPDF}
                  >
                    <FileDown className="mr-1" />
                    Download PDF
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
