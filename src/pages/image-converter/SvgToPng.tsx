
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useImageConversion } from "./useImageConversion";
import { useState } from "react";

const SvgToPng = () => {
  const {
    inputFile,
    inputUrl,
    outputUrl,
    handleInput,
    convert,
    download,
    canvasRef,
  } = useImageConversion("png");
  const [error, setError] = useState<string | null>(null);

  // Accept only SVG images
  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.match(/^image\/svg\+xml$/)) {
      setError("Only .svg files are supported.");
      return;
    }
    handleInput(f);
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-card shadow-lg rounded-lg p-8 text-center">
          <Image className="mx-auto h-12 w-12 text-sky-700 mb-4" />
          <h1 className="text-2xl font-bold mb-2">SVG to PNG Converter</h1>
          <p className="mb-6 text-muted-foreground">
            Convert vector SVG files to PNG images instantly, right in your browser.
          </p>
          <div className="mb-4 flex flex-col items-center gap-2">
            <input
              type="file"
              accept="image/svg+xml,.svg"
              onChange={onFileChange}
              className="mb-2"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>
          {inputUrl && (
            <div className="mb-4">
              <div className="font-semibold mb-1">Original Preview:</div>
              <img
                src={inputUrl}
                alt="SVG Preview"
                className="mx-auto mb-2 max-h-48 rounded border"
              />
            </div>
          )}
          {inputFile && (
            <Button
              className="w-full mt-2"
              variant="default"
              onClick={convert}
              disabled={!!outputUrl}
            >
              Convert to PNG
            </Button>
          )}
          {outputUrl && (
            <div className="mt-6">
              <div className="font-semibold mb-1">PNG Preview:</div>
              <img
                src={outputUrl}
                alt="PNG Output Preview"
                className="mx-auto mb-2 max-h-48 rounded border"
              />
              <Button className="w-full" variant="outline" onClick={download}>
                Download PNG
              </Button>
            </div>
          )}
          <Link
            to="/image-converter"
            className="block mt-8 text-sky-600 underline"
          >
            ← Back to Image Converter
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SvgToPng;
