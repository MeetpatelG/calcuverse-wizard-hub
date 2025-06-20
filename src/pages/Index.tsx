import { useState } from "react";
import { Search, Calculator, TrendingUp, Heart, Building, ShoppingCart, Home as HomeIcon, DollarSign, Activity, BarChart3, Instagram, Image as ImageIcon, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BasicCalculator from "@/components/BasicCalculator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Removed pdfTools and PDF category logic

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Financial Calculators",
      icon: TrendingUp,
      description: "Manage your finances with powerful calculation tools",
      calculators: ["Loan EMI", "Mortgage", "Investment Returns", "Tax", "Budget Planner", "Compound Interest"],
      color: "bg-green-100 text-green-700",
      route: "/financial"
    },
    {
      title: "Personal Calculators",
      icon: Heart,
      description: "Health, lifestyle, and personal calculation tools",
      calculators: ["Age Calculator", "BMI Calculator", "Calorie Calculator", "Pregnancy Due Date"],
      color: "bg-pink-100 text-pink-700",
      route: "/personal"
    },
    {
      title: "Mathematical Calculators",
      icon: Calculator,
      description: "Advanced mathematical and scientific calculations",
      calculators: ["Scientific Calculator", "Unit Converter", "Percentage", "Date Difference"],
      color: "bg-blue-100 text-blue-700",
      route: "/mathematical"
    },
    {
      title: "Business Calculators",
      icon: Building,
      description: "Essential tools for business and professional use",
      calculators: ["Profit Margin", "Break-even Point", "ROI Calculator", "Business Valuation"],
      color: "bg-purple-100 text-purple-700",
      route: "/business"
    },
    {
      title: "E-commerce Calculators",
      icon: ShoppingCart,
      description: "Online business and e-commerce calculation tools",
      calculators: ["Shipping Cost", "Product Pricing", "Profit Calculator", "Conversion Rate"],
      color: "bg-cyan-100 text-cyan-700",
      route: "/ecommerce"
    },
    {
      title: "Real Estate Calculators",
      icon: HomeIcon,
      description: "Property and real estate calculation tools",
      calculators: ["Property Value", "Rent Affordability", "Mortgage Payment", "Investment Analysis"],
      color: "bg-orange-100 text-orange-700",
      route: "/real-estate"
    },
    {
      title: "Social Media Calculators",
      icon: Instagram,
      description: "Track and analyze your social media growth and engagement.",
      calculators: ["Engagement Rate Calculator"],
      color: "bg-yellow-100 text-yellow-700",
      route: "/social-media"
    },
    {
      title: "Image Converter",
      icon: ImageIcon,
      description: "Convert and optimize your images to different formats in seconds.",
      calculators: [
        "JPG to PNG Converter",
        "PNG to JPG Converter",
        "WEBP to JPG Converter",
        "JPG to WEBP Converter",
        "PNG to WEBP Converter",
        "GIF to JPG Converter",
        "GIF to PNG Converter",
        "BMP to JPG Converter",
        "TIFF to JPG Converter",
        "HEIC to JPG Converter",
        "SVG to PNG Converter",
        "SVG to JPG Converter",
        "Image to PDF Converter",
        "Image Resizer",
        "Image Compressor",
        "Image Format Converter",
        "Image Crop Tool",
        "Image Rotator",
        "Batch Image Converter",
        "Image Color Converter"
      ],
      color: "bg-sky-100 text-sky-700",
      route: "/image-converter"
    },
    {
      title: "PDF Converter",
      icon: FileText,
      description: "Convert, extract, and create PDFs with advanced PDF tools.",
      calculators: [
        "PDF to Word Converter",
        "Word to PDF Converter",
        "PDF to Excel Converter",
        "Excel to PDF Converter",
        "PDF to PowerPoint Converter",
        "PowerPoint to PDF Converter",
        "PDF to Image Converter",
        "Image to PDF Converter",
        "PDF to Text Converter",
        "Text to PDF Converter",
        "HTML to PDF Converter",
        "PDF to EPUB Converter",
        "EPUB to PDF Converter",
        "PDF to MOBI Converter",
        "MOBI to PDF Converter",
        "PDF to XML Converter",
        "XML to PDF Converter",
        "PDF OCR Converter",
        "PDF to CSV Converter",
        "CSV to PDF Converter"
      ],
      color: "bg-red-100 text-red-700",
      route: "/pdf"
    }
  ];

  const featuredCalculators = [
    { 
      name: "Loan EMI Calculator", 
      description: "Calculate your monthly loan payments", 
      route: "/financial/loan-emi",
      icon: DollarSign,
      color: "bg-green-100 text-green-700"
    },
    { 
      name: "BMI Calculator", 
      description: "Check your body mass index", 
      route: "/personal/bmi",
      icon: Activity,
      color: "bg-pink-100 text-pink-700"
    },
    { 
      name: "Scientific Calculator", 
      description: "Advanced mathematical calculations", 
      route: "/mathematical/scientific",
      icon: Calculator,
      color: "bg-blue-100 text-blue-700"
    },
    { 
      name: "Profit Margin Calculator", 
      description: "Calculate business profit margins", 
      route: "/business/profit-margin",
      icon: BarChart3,
      color: "bg-purple-100 text-purple-700"
    }
  ];

  // FILTERING LOGIC FOR SEARCH
  const query = searchQuery.trim().toLowerCase();

  // Filtered categories: only show if any calculator or title/description match the search
  const filteredCategories = query
    ? categories
        .map(cat => {
          // Filter calculators for this category that match
          const filteredCalcs = cat.calculators.filter(calc =>
            calc.toLowerCase().includes(query)
          );
          // Match if title/description or ANY calculator match the query
          if (
            cat.title.toLowerCase().includes(query) ||
            (cat.description && cat.description.toLowerCase().includes(query)) ||
            filteredCalcs.length > 0
          ) {
            return {
              ...cat,
              calculators: filteredCalcs.length > 0 ? filteredCalcs : cat.calculators
            };
          }
          return null;
        })
        .filter(Boolean)
    : categories;

  // Filtered featured calculators
  const filteredFeaturedCalcs = query
    ? featuredCalculators.filter(
        calc =>
          calc.name.toLowerCase().includes(query) ||
          (calc.description && calc.description.toLowerCase().includes(query))
      )
    : featuredCalculators;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-6">Ultimate Calculator Hub</h1>
              <p className="text-xl mb-8 max-w-2xl">
                Your one-stop destination for all calculation needs. From financial planning to scientific computations, 
                we've got the perfect calculator for every situation.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-md mx-auto lg:mx-0 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search calculators..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 text-lg text-black placeholder:text-gray-400 bg-white"
                  // Note: For dark mode, adjust text color accordingly!
                />
              </div>
            </div>
            
            {/* Calculator Widget */}
            <div className="flex justify-center lg:justify-end">
              <BasicCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Calculator Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCategories.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-12">
                No calculators or categories found.
              </div>
            ) : (
              filteredCategories.map((category, index) => (
                <Link key={index} to={category.route}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <category.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.calculators.slice(0, 6).map((calc, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                            {calc}
                          </span>
                        ))}
                        {category.calculators.length > 6 && (
                          <span className="text-xs text-muted-foreground">+{category.calculators.length - 6} more</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Calculators */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeaturedCalcs.length === 0 ? (
              <div className="col-span-full text-center text-muted-foreground py-12">
                No calculators found.
              </div>
            ) : (
              filteredFeaturedCalcs.map((calc, index) => (
                <Link key={index} to={calc.route}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${calc.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <calc.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="text-lg">{calc.name}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Try Calculator
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
