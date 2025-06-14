
import { useRef, useState } from "react";

export function useImageConversion(targetFormat: "png" | "jpg" | "webp") {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [inputUrl, setInputUrl] = useState<string | null>(null);
  const [outputUrl, setOutputUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Preview original image
  const handleInput = (file: File) => {
    setInputFile(file);
    setOutputUrl(null);
    const url = URL.createObjectURL(file);
    setInputUrl(url);
  };

  // Convert image to target format
  const convert = async () => {
    if (!inputFile) return;
    const img = new window.Image();
    img.src = inputUrl!;
    img.onload = () => {
      // Create a canvas element
      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      // Convert canvas to desired format
      const mimeType =
        targetFormat === "png"
          ? "image/png"
          : targetFormat === "jpg"
          ? "image/jpeg"
          : "image/webp";
      canvas.toBlob(
        (blob) => {
          if (blob) {
            setOutputUrl(URL.createObjectURL(blob));
          }
        },
        mimeType,
        0.95
      );
      if (!canvasRef.current) canvasRef.current = canvas; // cache it
    };
  };

  // Download the converted image
  const download = () => {
    if (!outputUrl) return;
    const link = document.createElement("a");
    link.href = outputUrl;
    let ext = targetFormat === "jpg" ? "jpg" : targetFormat;
    link.download = `converted.${ext}`;
    link.click();
  };

  return {
    inputFile,
    inputUrl,
    outputUrl,
    handleInput,
    convert,
    download,
    canvasRef,
  };
}
