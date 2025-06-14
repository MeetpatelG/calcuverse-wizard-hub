
import { useState } from "react";
import { removeBackground, loadImage } from "./backgroundRemovalImpl";

export function useBackgroundRemoval() {
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  async function process(file: File): Promise<string | null> {
    setLoading(true);
    setResultUrl(null);
    try {
      const image = await loadImage(file);
      const blob = await removeBackground(image);
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      return url;
    } catch (e) {
      setResultUrl(null);
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { loading, resultUrl, process };
}
