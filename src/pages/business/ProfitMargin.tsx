
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfitMarginForm from "@/components/business/ProfitMarginForm";
import ProfitMarginResults from "@/components/business/ProfitMarginResults";
import ProfitMarginFAQ from "@/components/business/ProfitMarginFAQ";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProfitMargin = () => {
  const [profit, setProfit] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [markupPercentage, setMarkupPercentage] = useState(0);
  const [calculated, setCalculated] = useState(false);

  // SEO optimization
  useEffect(() => {
    document.title = "Profit Margin Calculator - Calculate Business Profit & Markup | Calculator Hub";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Free profit margin calculator. Calculate profit, profit margin percentage, and markup for your business. Includes analysis and tips for improving profitability.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Free profit margin calculator. Calculate profit, profit margin percentage, and markup for your business. Includes analysis and tips for improving profitability.";
      document.head.appendChild(meta);
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute("content", "profit margin calculator, markup calculator, profit calculator, business calculator, profit margin formula, markup percentage");
    } else {
      const meta = document.createElement('meta');
      meta.name = "keywords";
      meta.content = "profit margin calculator, markup calculator, profit calculator, business calculator, profit margin formula, markup percentage";
      document.head.appendChild(meta);
    }
  }, []);

  const handleCalculate = (data: { profit: number; profitMargin: number; markupPercentage: number }) => {
    setProfit(data.profit);
    setProfitMargin(data.profitMargin);
    setMarkupPercentage(data.markupPercentage);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground">Home</Link> / 
          <Link to="/business" className="hover:text-foreground"> Business Calculators</Link> / 
          <span className="text-foreground"> Profit Margin Calculator</span>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h1 className="text-4xl font-bold">Profit Margin Calculator</h1>
            <Badge variant="secondary">Free Tool</Badge>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your business profit margins, markup percentages, and analyze profitability. 
            Make informed pricing decisions with our comprehensive profit analysis tool.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ProfitMarginForm onCalculate={handleCalculate} />
          <ProfitMarginResults 
            profit={profit}
            profitMargin={profitMargin}
            markupPercentage={markupPercentage}
            calculated={calculated}
          />
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>How to Use the Profit Margin Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Step 1: Enter Cost Price</h4>
                <p className="text-sm text-muted-foreground">
                  Input the total cost to produce or purchase the item, including materials, labor, and overhead costs.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 2: Enter Selling Price</h4>
                <p className="text-sm text-muted-foreground">
                  Input the price at which you plan to sell or are currently selling the item.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Step 3: Calculate</h4>
                <p className="text-sm text-muted-foreground">
                  Click calculate to see your profit, profit margin percentage, and markup percentage with detailed analysis.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Understanding the Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Profit</h4>
                <p className="text-sm text-muted-foreground">
                  The absolute dollar amount you earn: Selling Price - Cost Price
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Profit Margin</h4>
                <p className="text-sm text-muted-foreground">
                  Percentage of revenue that is profit: (Profit ÷ Selling Price) × 100
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Markup</h4>
                <p className="text-sm text-muted-foreground">
                  Percentage added to cost price: (Profit ÷ Cost Price) × 100
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <ProfitMarginFAQ />
      </div>

      <Footer />
    </div>
  );
};

export default ProfitMargin;
