
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";
const PngToWebp = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-xl mx-auto bg-card shadow-lg rounded-lg p-8 text-center">
        <Image className="mx-auto h-12 w-12 text-sky-700 mb-4" />
        <h1 className="text-2xl font-bold mb-2">PNG to WEBP Converter</h1>
        <p className="mb-6 text-muted-foreground">Convert PNG images to WEBP format.<br />This tool is coming soon!</p>
        <Link to="/image-converter" className="text-sky-600 underline">← Back to Image Converter</Link>
      </div>
    </main>
    <Footer />
  </div>
);
export default PngToWebp;
