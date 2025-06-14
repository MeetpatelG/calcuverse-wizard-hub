
import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }
  }
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0, width, height);
}

export const removeBackground = async (image: HTMLImageElement): Promise<Blob> => {
  const segmenter = await pipeline("image-segmentation", "Xenova/segformer-b0-finetuned-ade-512-512",{device:"webgpu"});
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error('No context');
  resizeImageIfNeeded(canvas, ctx, image);
  const base64 = canvas.toDataURL("image/jpeg", 0.8);
  const result = await segmenter(base64);

  if (!result || !Array.isArray(result) || !result[0].mask) {
    throw new Error("No mask");
  }
  // mask is 1-background, set alpha=0 for background
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = canvas.width;
  outputCanvas.height = canvas.height;
  const outputCtx = outputCanvas.getContext("2d");
  if (!outputCtx) throw new Error('No ctx2');
  outputCtx.drawImage(canvas, 0, 0);
  const outData = outputCtx.getImageData(0, 0, outputCanvas.width, outputCanvas.height);
  const data = outData.data;
  for (let i = 0; i < result[0].mask.data.length; i++) {
    const alpha = Math.round((1 - result[0].mask.data[i]) * 255);
    data[i * 4 + 3] = alpha;
  }
  outputCtx.putImageData(outData, 0, 0);

  return new Promise((resolve, reject) => {
    outputCanvas.toBlob(b => b ? resolve(b) : reject(), "image/png", 1.0);
  });
};

export const loadImage = (file: Blob): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
