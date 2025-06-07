
import { useState } from "react";
import { BarChart3, Calculator, DollarSign, TrendingUp, Target, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProfitMarginForm from "@/components/business/ProfitMarginForm";
import ProfitMarginResults from "@/components/business/ProfitMarginResults";
import ProfitMarginFAQ from "@/components/business/ProfitMarginFAQ";

const ProfitMargin = () => {
  const [result, setResult] = useState<{
    profit: number;
    profitMargin: number;
    markupPercentage: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = (data: {
    profit: number;
    profitMargin: number;
    markupPercentage: number;
  }) => {
    setResult(data);
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <BarChart3 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Profit Margin Calculator</h1>
            <p className="text-xl text-muted-foreground">
              Calculate profit, profit margin, and markup percentage for your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <ProfitMarginForm onCalculate={handleCalculate} />
            <ProfitMarginResults 
              profit={result?.profit || 0}
              profitMargin={result?.profitMargin || 0}
              markupPercentage={result?.markupPercentage || 0}
              calculated={calculated}
            />
          </div>

          {/* SEO Content Section */}
          <div className="bg-muted/30 rounded-lg p-8 mb-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Complete Guide to Profit Margin Calculator</h2>
              
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  Understanding your profit margins is crucial for business success and financial sustainability. Our comprehensive profit margin calculator helps you analyze your pricing strategy, evaluate product profitability, and make informed business decisions that drive growth and maximize your bottom line.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-card p-6 rounded-lg border">
                    <Calculator className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Accurate Analysis</h3>
                    <p className="text-sm">Get precise profit margin calculations with detailed breakdowns of profit and markup percentages.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <Target className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Pricing Strategy</h3>
                    <p className="text-sm">Optimize your pricing strategy by understanding the relationship between cost, price, and profit.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg border">
                    <TrendingUp className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">Business Growth</h3>
                    <p className="text-sm">Make data-driven decisions to improve profitability and drive sustainable business growth.</p>
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Understanding Profit Margins</h3>
                <p className="mb-4">
                  Profit margin is a fundamental business metric that measures how much profit your business generates from each dollar of revenue. It's expressed as a percentage and calculated by dividing your profit by your selling price. A higher profit margin indicates better operational efficiency and pricing strategy, while lower margins may signal the need for cost reduction or price optimization.
                </p>

                <p className="mb-6">
                  Understanding the difference between profit margin and markup is essential for effective pricing. While profit margin is based on selling price, markup is calculated based on cost price. This distinction affects how you set prices and evaluate profitability across different products or services in your business portfolio.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Benefits of Using Our Profit Margin Calculator</h3>
                <ul className="list-disc pl-6 mb-6 space-y-2">
                  <li><strong>Pricing Optimization:</strong> Determine optimal selling prices to achieve target profit margins</li>
                  <li><strong>Cost Analysis:</strong> Evaluate the impact of cost changes on overall profitability</li>
                  <li><strong>Product Comparison:</strong> Compare profitability across different products or services</li>
                  <li><strong>Financial Planning:</strong> Set realistic profit targets and business goals</li>
                  <li><strong>Competitive Analysis:</strong> Understand your position relative to industry standards</li>
                  <li><strong>Investment Decisions:</strong> Evaluate the profitability of new product lines or services</li>
                </ul>

                <h3 className="text-2xl font-semibold mb-4">Profit Margin vs. Markup Percentage</h3>
                <p className="mb-4">
                  Many business owners confuse profit margin with markup percentage, but they represent different aspects of your pricing strategy. Profit margin shows what percentage of your selling price is profit, while markup shows what percentage above cost you're charging. For example, if you buy a product for $100 and sell it for $150, your markup is 50% but your profit margin is 33.3%.
                </p>

                <div className="bg-card p-6 rounded-lg border my-6">
                  <h4 className="font-semibold mb-3">💡 Business Tip</h4>
                  <p className="text-sm">
                    Industry profit margins vary significantly. Retail businesses typically operate on 2-6% margins, while service businesses can achieve 15-20% or higher. Research your industry benchmarks to set competitive yet profitable pricing.
                  </p>
                </div>

                <h3 className="text-2xl font-semibold mb-4">Types of Profit Margins</h3>
                <p className="mb-4">
                  Our calculator focuses on gross profit margin, which considers only the direct costs of goods sold. However, businesses should also understand net profit margin, which includes all operating expenses, taxes, and interest. Gross profit margin helps evaluate product-level profitability, while net profit margin shows overall business efficiency.
                </p>

                <p className="mb-6">
                  Operating profit margin sits between gross and net margins, excluding only taxes and interest payments. Each type provides different insights into your business performance and helps identify areas for improvement in cost management and operational efficiency.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Improving Your Profit Margins</h3>
                <p className="mb-4">
                  There are several strategies to improve profit margins: increasing prices, reducing costs, improving operational efficiency, focusing on higher-margin products, negotiating better supplier terms, or reducing waste. The key is finding the right balance that maintains customer satisfaction while maximizing profitability.
                </p>

                <p className="mb-6">
                  Consider implementing value-based pricing, where prices reflect the value delivered to customers rather than just cost-plus markup. This approach often allows for higher margins while providing customers with products or services they perceive as valuable investments.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Industry Benchmarks and Standards</h3>
                <p className="mb-4">
                  Different industries have varying profit margin expectations. Technology companies often enjoy higher margins due to scalability, while retail businesses operate on thinner margins due to competition and volume-based models. Understanding your industry's typical margins helps set realistic expectations and identify opportunities for improvement.
                </p>

                <p className="mb-6">
                  Seasonal businesses may experience fluctuating margins throughout the year, requiring careful planning and cash flow management. Use our calculator to model different scenarios and prepare for seasonal variations in your business cycle.
                </p>

                <h3 className="text-2xl font-semibold mb-4">Profit Margin Analysis for Growth</h3>
                <p className="mb-6">
                  Regular profit margin analysis is essential for sustainable business growth. Monitor margins across different products, time periods, and customer segments to identify trends and opportunities. Use these insights to make strategic decisions about inventory, pricing, marketing investments, and business expansion plans.
                </p>
              </div>
            </div>
          </div>

          <ProfitMarginFAQ />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfitMargin;
