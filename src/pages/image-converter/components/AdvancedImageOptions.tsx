
import { Slider } from "@/components/ui/slider";
import React from "react";

type AdvancedImageOptionsProps = {
  quality: number;
  setQuality: (val: number) => void;
  brightness: number;
  setBrightness: (val: number) => void;
  contrast: number;
  setContrast: (val: number) => void;
  grayscale: boolean;
  setGrayscale: (val: boolean) => void;
  sepia: boolean;
  setSepia: (val: boolean) => void;
  watermarkText: string;
  setWatermarkText: (val: string) => void;
  removeBackground: boolean;
  setRemoveBackground: (val: boolean) => void;
};

export function AdvancedImageOptions({
  quality,
  setQuality,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  grayscale,
  setGrayscale,
  sepia,
  setSepia,
  watermarkText,
  setWatermarkText,
  removeBackground,
  setRemoveBackground,
}: AdvancedImageOptionsProps) {
  return (
    <div className="mb-4 bg-muted rounded p-4 text-left space-y-4">
      <div>
        <label className="font-semibold">Quality: {quality}%</label>
        <Slider
          min={15}
          max={100}
          value={[quality]}
          onValueChange={([v]) => setQuality(v)}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="font-semibold">Brightness: {brightness}%</label>
          <Slider
            min={0}
            max={200}
            value={[brightness]}
            onValueChange={([v]) => setBrightness(v)}
          />
        </div>
        <div className="flex-1">
          <label className="font-semibold">Contrast: {contrast}%</label>
          <Slider
            min={0}
            max={200}
            value={[contrast]}
            onValueChange={([v]) => setContrast(v)}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <label>
          <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} className="mr-2" />
          Grayscale
        </label>
        <label>
          <input type="checkbox" checked={sepia} onChange={(e) => setSepia(e.target.checked)} className="mr-2" />
          Sepia
        </label>
      </div>
      <div>
        <label className="block font-semibold">Watermark (optional):</label>
        <input
          type="text"
          className="w-full border px-2 py-1 rounded"
          placeholder="Enter watermark text"
          value={watermarkText}
          onChange={(e) => setWatermarkText(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input type="checkbox" checked={removeBackground} onChange={(e) => setRemoveBackground(e.target.checked)} className="mr-2" />
          Remove background (beta)
        </label>
      </div>
    </div>
  );
}
