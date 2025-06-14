
import { Link } from "react-router-dom";
import {
  FileText,
  FilePlus,
  FileMinus,
  FileDown,
  FileUp,
  FileImage,
  FileSearch,
  FileCode2,
  FileX,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// PDF tools list, each with a matching available lucide-react icon
const pdfTools = [
  { name: "PDF to Word Converter", route: "/pdf/pdf-to-word", desc: "Convert PDF files to editable Word documents.", icon: FileText },
  { name: "Word to PDF Converter", route: "/pdf/word-to-pdf", desc: "Convert Microsoft Word documents (.doc, .docx) to PDF.", icon: FilePlus },
  { name: "PDF to Excel Converter", route: "/pdf/pdf-to-excel", desc: "Extract tabular data by converting PDF files to Excel format.", icon: FileDown },
  { name: "Excel to PDF Converter", route: "/pdf/excel-to-pdf", desc: "Convert Excel spreadsheets (.xls, .xlsx) to PDF files.", icon: FileUp },
  { name: "PDF to PowerPoint Converter", route: "/pdf/pdf-to-ppt", desc: "Convert PDF files into editable PowerPoint presentations.", icon: FilePlus },
  { name: "PowerPoint to PDF Converter", route: "/pdf/ppt-to-pdf", desc: "Convert PowerPoint presentations (.ppt, .pptx) to PDF files.", icon: FileMinus },
  { name: "PDF to Image Converter", route: "/pdf/pdf-to-image", desc: "Convert PDF file pages to images (JPEG, PNG).", icon: FileImage },
  { name: "Image to PDF Converter", route: "/pdf/image-to-pdf", desc: "Combine images into a single PDF file.", icon: FileImage },
  { name: "PDF to Text Converter", route: "/pdf/pdf-to-text", desc: "Extract text from PDF files.", icon: FileSearch },
  { name: "Text to PDF Converter", route: "/pdf/text-to-pdf", desc: "Convert plain text files into PDF documents.", icon: FileText },
  { name: "HTML to PDF Converter", route: "/pdf/html-to-pdf", desc: "Turn web pages or HTML files into PDFs.", icon: FileCode2 },
  { name: "PDF to EPUB Converter", route: "/pdf/pdf-to-epub", desc: "Convert PDFs to EPUB ebook format.", icon: FileDown },
  { name: "EPUB to PDF Converter", route: "/pdf/epub-to-pdf", desc: "Convert EPUB ebooks to standard PDF files.", icon: FileUp },
  { name: "PDF to MOBI Converter", route: "/pdf/pdf-to-mobi", desc: "Convert PDF files to MOBI format for Kindle devices.", icon: FileDown },
  { name: "MOBI to PDF Converter", route: "/pdf/mobi-to-pdf", desc: "Convert MOBI ebooks to PDF format.", icon: FileUp },
  { name: "PDF to XML Converter", route: "/pdf/pdf-to-xml", desc: "Export PDF data to XML file format.", icon: FileDown },
  { name: "XML to PDF Converter", route: "/pdf/xml-to-pdf", desc: "Turn XML files into readable PDF documents.", icon: FileUp },
  { name: "PDF OCR Converter", route: "/pdf/pdf-ocr", desc: "Convert scanned images in PDFs to editable/searchable text (OCR).", icon: FileSearch },
  { name: "PDF to CSV Converter", route: "/pdf/pdf-to-csv", desc: "Extract tabular data from PDFs and save to CSV files.", icon: FileDown },
  { name: "CSV to PDF Converter", route: "/pdf/csv-to-pdf", desc: "Turn CSV files into printable PDF tables.", icon: FileUp },
];

const PDFConverterIndex = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <FileText className="h-8 w-8 text-primary" /> PDF Converter Tools
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pdfTools.map(tool => (
          <Link to={tool.route} key={tool.route}>
            <Card className="hover:shadow-md group transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {tool.icon && (
                    <tool.icon className="h-6 w-6 text-primary group-hover:text-primary/80 transition-colors" />
                  )}
                  <CardTitle className="text-lg group-hover:text-primary">{tool.name}</CardTitle>
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

export default PDFConverterIndex;
