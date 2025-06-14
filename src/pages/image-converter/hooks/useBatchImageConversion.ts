
import { useRef, useState } from "react";

type ConversionRecord = {
  inputName: string;
  time: number;
  outputUrl: string;
  format: string;
};

export function useBatchImageConversion(targetFormat: "jpg" | "png" | "webp") {
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const [outputMap, setOutputMap] = useState<{[input: string]: string}>({});
  const [history, setHistory] = useState<ConversionRecord[]>([]);
  const dropZoneRef = useRef<HTMLDivElement | null>(null);

  function addFiles(files: FileList | File[]) {
    const arr = Array.from(files);
    setInputFiles((old) => [...old, ...arr]);
  }

  function clearQueue() {
    setInputFiles([]);
    setOutputMap({});
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function registerDropZone(ref: HTMLDivElement | null) {
    dropZoneRef.current = ref;
  }

  function appendToHistory(inputName: string, outputUrl: string) {
    setHistory((hist) => [
      { inputName, outputUrl, time: Date.now(), format: targetFormat },
      ...hist
    ].slice(0, 15));
  }

  return {
    inputFiles,
    addFiles,
    setInputFiles,
    outputMap,
    setOutputMap,
    history,
    appendToHistory,
    clearQueue,
    handleDrop,
    handleDragOver,
    registerDropZone,
    dropZoneRef,
  };
}
