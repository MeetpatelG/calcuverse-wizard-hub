
import React, { useCallback, useRef } from "react";
import Cropper from "react-easy-crop";

type Area = { x: number; y: number; width: number; height: number };

type Props = {
  image: string;
  crop: { x: number; y: number };
  setCrop: (v: { x: number; y: number }) => void;
  zoom: number;
  setZoom: (v: number) => void;
  aspect: number;
  croppedAreaPixels: Area | null;
  setCroppedAreaPixels: (a: Area) => void;
};

export function ImageCropper({
  image,
  crop,
  setCrop,
  zoom,
  setZoom,
  aspect,
  croppedAreaPixels,
  setCroppedAreaPixels,
}: Props) {
  const onCropComplete = useCallback(
    (_: Area, cropped: Area) => {
      setCroppedAreaPixels(cropped);
    },
    [setCroppedAreaPixels]
  );

  return (
    <div className="relative w-full h-64 bg-black">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
  );
}
