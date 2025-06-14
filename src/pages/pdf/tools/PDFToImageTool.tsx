
import React, { useState } from "react";
import { LoaderCircle, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// @ts-ignore
import * as pdfjsLib from "pdfjs-dist/build/pdf";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

export default function PDFToImageTool() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImages([]);
    setError(null);
    const file = e.target.files?.[0];
    setPdfFile(file || null);
    if (!file) return;
    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const imagesArr: string[] = [];
      for (let pageNum = 1; pageNum <= Math.min(3, pdf.numPages); pageNum++) {
        const page = await pdf.getPage(pageNum);
        // Hardcode at 2x resolution, preview first 3 pages max for demo
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
        imagesArr.push(canvas.toDataURL("image/png"));
      }
      setImages(imagesArr);
    } catch (err) {
      setError("Failed to render images for this PDF.");
    }
    setLoading(false);
  }

  function handleDownloadImage(idx: number) {
    const url = images[idx];
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = `page_${idx + 1}.png`;
    link.click();
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-1">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex gap-3 items-center mb-1">
              <FileDown className="h-8 w-8 text-primary" />
              <CardTitle>PDF to Image Converter</CardTitle>
            </div>
            <CardDescription>
              Convert first 3 PDF pages to PNG images (proof of concept). Full batch export coming soon!
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
                  <LoaderCircle className="animate-spin" /> Rendering images...
                </div>
              )}
              {error && <div className="text-destructive text-sm">{error}</div>}
              {images.length > 0 && (
                <div className="flex flex-col space-y-2">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className="bg-muted rounded p-3 text-sm mb-2 flex items-center"
                    >
                      <img
                        src={img}
                        alt={`PDF page ${idx + 1}`}
                        className="h-24 mr-4 border rounded"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleDownloadImage(idx)}
                      >
                        <FileDown className="mr-1" />
                        Download PNG
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
