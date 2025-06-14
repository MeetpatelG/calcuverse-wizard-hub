
// Updated: All-in-one advanced JPG to PNG converter demo

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { AdvancedImageOptions } from "./components/AdvancedImageOptions";
import { useBatchImageConversion } from "./hooks/useBatchImageConversion";
import { ImageCropper } from "./components/ImageCropper";
import { useBackgroundRemoval } from "./hooks/useBackgroundRemoval";

const initialAdvanced = {
  quality: 90,
  brightness: 100,
  contrast: 100,
  grayscale: false,
  sepia: false,
  watermarkText: "",
  removeBackground: false,
};

const JpgToPng = () => {
  // Advanced options state
  const [adv, setAdv] = useState(initialAdvanced);
  // Cropper state
  const [crop, setCrop] = useState<{x:number;y:number}>({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);
  const [showCrop, setShowCrop] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

  // Batch & drag-drop
  const {
    inputFiles,
    addFiles,
    outputMap,
    setOutputMap,
    history,
    appendToHistory,
    clearQueue,
    handleDrop,
    handleDragOver,
    registerDropZone,
    dropZoneRef,
  } = useBatchImageConversion("png");

  // Background remover
  const bgRemoval = useBackgroundRemoval();

  // Handle advanced option changes
  function setAdvOpt<K extends keyof typeof adv>(k: K, v: typeof adv[K]) {
    setAdv(o => ({...o, [k]: v}));
  }

  // File input event
  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) addFiles(e.target.files);
  }

  // Remove a file from queue
  function removeFile(idx: number) {
    const arr = [...inputFiles];
    arr.splice(idx,1);
    setOutputMap((m)=>{const n={...m};delete n[inputFiles[idx].name];return n;});
    clearQueue();
  }

  // Handle convert all
  async function handleConvert() {
    for (const file of inputFiles) {
      let imgEl = document.createElement("img");
      const url = URL.createObjectURL(file);
      await new Promise((res,rej)=>{
        imgEl.onload = ()=>res(true);
        imgEl.onerror = rej;
        imgEl.src = url;
      });

      // Cropping
      let cropBox = null;
      if (showCrop && croppedAreaPixels) {
        const canvas = document.createElement("canvas");
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            imgEl,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
          );
          imgEl = document.createElement("img");
          imgEl.src = canvas.toDataURL();
          await new Promise((res,rej)=>{
            imgEl.onload = ()=>res(true);
            imgEl.onerror = rej;
          });
        }
      }

      // Background remove
      if (adv.removeBackground) {
        try {
          const blob = await bgRemoval.process(file);
          if (blob) {
            imgEl = document.createElement("img");
            imgEl.src = blob;
            await new Promise((res,rej)=>{
              imgEl.onload = ()=>res(true);
              imgEl.onerror = rej;
            });
          }
        } catch {}
      }

      // Create canvas for write operations
      const canvas = document.createElement("canvas");
      canvas.width = imgEl.width;
      canvas.height = imgEl.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) continue;

      // Color Adjust
      ctx.filter =
        `brightness(${adv.brightness/100}) contrast(${adv.contrast/100})`
        + (adv.grayscale ? " grayscale(1)" : "")
        + (adv.sepia ? " sepia(1)" : "");
      ctx.drawImage(imgEl, 0, 0);

      // Watermark
      if (adv.watermarkText) {
        ctx.font = "bold 24px sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillText(adv.watermarkText, 12, canvas.height - 24);
      }

      // Export as PNG
      await new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const outputUrl = URL.createObjectURL(blob);
            setOutputMap(prev => ({...prev, [file.name]: outputUrl}));
            appendToHistory(file.name, outputUrl);
            resolve();
          }
        }, "image/png", adv.quality/100);
      });
    }
  }

  // Download one file
  function download(key: string) {
    const url = outputMap[key];
    if (!url) return;
    const link = document.createElement("a");
    link.href = url;
    link.download = key.replace(/\.[^.]+$/, ".png");
    link.click();
  }

  // Download all zips (not implemented yet)
  function downloadAllZip() {
    alert("To be implemented.");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto bg-card shadow-lg rounded-lg p-8 ">
          <Image className="mx-auto h-12 w-12 text-sky-700 mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-center">JPG to PNG Converter (Advanced)</h1>
          <p className="mb-6 text-muted-foreground text-center">
            Convert JPG images to PNG format with advanced options.
          </p>
          {/* Advanced controls */}
          <AdvancedImageOptions
            quality={adv.quality}
            setQuality={v=>setAdvOpt("quality",v)}
            brightness={adv.brightness}
            setBrightness={v=>setAdvOpt("brightness",v)}
            contrast={adv.contrast}
            setContrast={v=>setAdvOpt("contrast",v)}
            grayscale={adv.grayscale}
            setGrayscale={v=>setAdvOpt("grayscale",v)}
            sepia={adv.sepia}
            setSepia={v=>setAdvOpt("sepia",v)}
            watermarkText={adv.watermarkText}
            setWatermarkText={v=>setAdvOpt("watermarkText",v)}
            removeBackground={adv.removeBackground}
            setRemoveBackground={v=>setAdvOpt("removeBackground",v)}
          />

          {/* Drop zone */}
          <div
            ref={registerDropZone}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-sky-400 py-6 px-2 rounded flex flex-col items-center gap-2 mb-4 bg-muted/40"
          >
            <input
              type="file"
              accept="image/jpeg,.jpg,.jpeg"
              multiple
              onChange={handleInput}
              className="mb-2"
            />
            <span className="text-xs text-muted-foreground">Drag and drop JPG images here, or click to select.</span>
          </div>

          {/* File list / previews */}
          <div className="mb-4">
            {inputFiles.map((file, i) => (
              <div key={i} className="border rounded p-2 mb-2 flex items-center">
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="h-16 w-16 object-cover rounded mr-2 border"
                />
                <div className="flex-grow">
                  <div className="font-semibold">{file.name}</div>
                  <div className="text-xs text-muted-foreground">{(file.size/1024).toFixed(1)} KB</div>
                </div>
                <Button size="sm" variant="outline" onClick={()=>removeFile(i)}>Remove</Button>
              </div>
            ))}
          </div>

          {/* Cropping */}
          {inputFiles.length > 0 && (
            <div className="mb-4">
              <Button variant="ghost" className="mb-2" onClick={()=>setShowCrop(v=>!v)}>
                {showCrop ? "Hide cropping" : "Crop before converting"}
              </Button>
              {showCrop && (
                <ImageCropper
                  image={URL.createObjectURL(inputFiles[0])}
                  crop={crop}
                  setCrop={setCrop}
                  zoom={zoom}
                  setZoom={setZoom}
                  aspect={1}
                  croppedAreaPixels={croppedAreaPixels}
                  setCroppedAreaPixels={setCroppedAreaPixels}
                />
              )}
            </div>
          )}

          {/* Convert button */}
          <Button
            className="w-full mt-2"
            variant="default"
            onClick={handleConvert}
            disabled={inputFiles.length === 0}
          >
            Convert {inputFiles.length > 1 ? "All" : ""} to PNG
          </Button>

          {/* Output previews and downloads */}
          <div className="mt-6 space-y-4">
            {Object.entries(outputMap).map(([filename, outputUrl], i) => (
              <div key={filename} className="flex items-center gap-2 border p-2 rounded">
                <img
                  src={outputUrl}
                  alt={`Output for ${filename}`}
                  className="h-16 w-16 object-cover rounded border mr-2"
                />
                <span className="flex-1">{filename.replace(/\.[^.]+$/, ".png")}</span>
                <Button size="sm" variant="outline" onClick={()=>download(filename)}>
                  Download
                </Button>
              </div>
            ))}
          </div>

          {Object.keys(outputMap).length > 1 && (
            <Button className="w-full mt-4" variant="secondary" onClick={downloadAllZip}>
              Download All as ZIP
            </Button>
          )}

          {/* Conversion history */}
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Conversion History</h3>
            <div className="max-h-32 overflow-y-auto text-sm space-y-2">
              {history.map((h,i)=>(
                <div key={i} className="flex justify-between items-center border-b pb-1">
                  <span>{h.inputName}</span>
                  <a href={h.outputUrl} download className="text-sky-600 underline">Download</a>
                  <span className="text-muted-foreground">{new Date(h.time).toLocaleTimeString()}</span>
                </div>
              ))}
              {history.length === 0 && <div className="text-muted-foreground">No conversions yet.</div>}
            </div>
          </div>

          <Link
            to="/image-converter"
            className="block mt-8 text-sky-600 underline text-center"
          >
            ← Back to Image Converter
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default JpgToPng;

