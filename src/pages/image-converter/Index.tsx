
import { Link } from "react-router-dom";
import {
  Image,
  Jpg,
  Png,
  Webp,
  Gif,
  Svg,
  Crop,
  RotateCcw,
  Compress,
  Resize,
  FileImage,
  ImagePlus,
  ImageDown,
  ImageSearch,
  ImageX,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const imageTools = [
  { name: "JPG to PNG Converter", route: "/image-converter/jpg-to-png", desc: "Convert JPG images to PNG format.", icon: Jpg },
  { name: "PNG to JPG Converter", route: "/image-converter/png-to-jpg", desc: "Convert PNG images to JPG format.", icon: Png },
  { name: "WEBP to JPG Converter", route: "/image-converter/webp-to-jpg", desc: "Convert WEBP images to JPG format.", icon: Webp },
  { name: "JPG to WEBP Converter", route: "/image-converter/jpg-to-webp", desc: "Convert JPG images to WEBP format.", icon: Jpg },
  { name: "PNG to WEBP Converter", route: "/image-converter/png-to-webp", desc: "Convert PNG images to WEBP format.", icon: Png },
  { name: "GIF to JPG Converter", route: "/image-converter/gif-to-jpg", desc: "Convert animated or static GIFs to JPG.", icon: Gif },
  { name: "GIF to PNG Converter", route: "/image-converter/gif-to-png", desc: "Convert GIF images to PNG format.", icon: Gif },
  { name: "BMP to JPG Converter", route: "/image-converter/bmp-to-jpg", desc: "Convert BMP files to JPG format.", icon: FileImage },
  { name: "TIFF to JPG Converter", route: "/image-converter/tiff-to-jpg", desc: "Convert TIFF files to JPG format.", icon: FileImage },
  { name: "HEIC to JPG Converter", route: "/image-converter/heic-to-jpg", desc: "Convert HEIC (iPhone images) to JPG.", icon: ImagePlus },
  { name: "SVG to PNG Converter", route: "/image-converter/svg-to-png", desc: "Convert vector SVG files to PNG images.", icon: Svg },
  { name: "SVG to JPG Converter", route: "/image-converter/svg-to-jpg", desc: "Convert SVG files to JPG format.", icon: Svg },
  { name: "Image to PDF Converter", route: "/image-converter/image-to-pdf", desc: "Combine multiple images into a single PDF.", icon: ImageDown },
  { name: "Image Resizer", route: "/image-converter/image-resizer", desc: "Resize images to specific dimensions or file size.", icon: Resize },
  { name: "Image Compressor", route: "/image-converter/image-compressor", desc: "Reduce image file size without losing quality.", icon: Compress },
  { name: "Image Format Converter", route: "/image-converter/image-format-converter", desc: "Convert images to other formats (e.g., BMP, ICO).", icon: FileImage },
  { name: "Image Crop Tool", route: "/image-converter/image-crop", desc: "Crop images to desired dimensions.", icon: Crop },
  { name: "Image Rotator", route: "/image-converter/image-rotator", desc: "Rotate images left, right, or flip them.", icon: RotateCcw },
  { name: "Batch Image Converter", route: "/image-converter/batch-image-converter", desc: "Convert multiple images at once to a chosen format.", icon: ImageSearch },
  { name: "Image Color Converter", route: "/image-converter/image-color-converter", desc: "Convert color images to black & white or grayscale.", icon: ImageX }
];

const ImageConverterIndex = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Image className="h-8 w-8 text-sky-700" /> Image Converter Tools
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageTools.map(tool => (
          <Link to={tool.route} key={tool.route}>
            <Card className="hover:shadow-md group transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {/* Render the icon dynamically */}
                  {tool.icon && (
                    <tool.icon className="h-6 w-6 text-sky-600 group-hover:text-sky-800 transition-colors" />
                  )}
                  <CardTitle className="text-lg group-hover:text-sky-700">{tool.name}</CardTitle>
                </div>
                <CardDescription>{tool.desc}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default ImageConverterIndex;
