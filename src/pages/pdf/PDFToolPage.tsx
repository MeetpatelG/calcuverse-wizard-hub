
import { FilePdf } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface PDFToolPageProps {
  title: string;
  description: string;
}

const PDFToolPage = ({ title, description }: PDFToolPageProps) => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg p-8 text-center">
        <div className="flex flex-col items-center mb-8">
          <FilePdf className="h-14 w-14 text-primary mb-4" />
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground text-lg mb-2">{description}</p>
        </div>
        <div className="bg-muted rounded-md py-6 px-4 mb-8">
          <span className="font-semibold text-primary">Under Construction</span>
          <p className="text-muted-foreground mt-2">This tool is coming soon! Check back later or explore our other calculators.</p>
        </div>
        <Link to="/" className="inline-block text-primary hover:underline font-medium">← Back to Home</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default PDFToolPage;
