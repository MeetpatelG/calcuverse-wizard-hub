
import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProfitMargin = () => {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [grossProfit, setGrossProfit] = useState(0);
  const [grossProfitMargin, setGrossProfitMargin] = useState(0);
  const [calculated, setCalculated] = useState(false);

  const calculateProfitMargin = () => {
    if (!revenue || !cost) return;

    const revenueNum = parseFloat(revenue);
    const costNum = parseFloat(cost);
    
    const profit = revenueNum - costNum;
    const margin = (profit / revenueNum) * 100;
    
    setGrossProfit(profit);
    setGrossProfitMargin(margin);
    setCalculated(true);
  };

  useEffect(() => {
    if (revenue && cost) {
      calculateProfitMargin();
    }
  }, [revenue, cost]);

  const getMarginColor = () => {
    if (grossProfitMargin < 0) return "text-red-600";
    if (grossProfitMargin < 10) return "text-orange-600";
    if (grossProfitMargin < 20) return "text-yellow-600";
    return "text-green-600";
  };

  const getMarginBgColor = () => {
    if (grossProfitMargin < 0) return "bg-red-100";
    if (grossProfitMargin < 10) return "bg-orange-100";
    if (grossProfitMargin < 20) return "bg-yellow-100";
    return "bg-green-100";
  };

  const getMarginAssessment = () => {
    if (grossProfitMargin < 0) return "Loss - Review pricing and costs";
    if (grossProfitMargin < 10) return "Low - Consider cost optimization";
    if (grossProfitMargin < 20) return "Moderate - Room for improvement";
    if (grossProfitMargin < 30) return "Good - Healthy margin";
    return "Excellent - Strong profitability";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Business Calculators</span> / <span className="text-foreground">Profit Margin Calculator</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <CardTitle>Profit Margin Calculator</CardTitle>
              </div>
              <CardDescription>
                Calculate your gross profit margin to understand your business profitability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Revenue Input */}
              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue ($)</Label>
                <Input
                  id="revenue"
                  type="number"
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                  placeholder="100,000"
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Total sales or income generated
                </p>
              </div>

              {/* Cost Input */}
              <div className="space-y-2">
                <Label htmlFor="cost">Cost of Goods Sold (COGS) ($)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  placeholder="70,000"
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground">
                  Direct costs to produce goods or services
                </p>
              </div>

              <Button onClick={calculateProfitMargin} className="w-full" disabled={!revenue || !cost}>
                Calculate Profit Margin
              </Button>

              {/* Quick Examples */}
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Industry Benchmarks</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Retail:</span>
                    <span>20-50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Manufacturing:</span>
                    <span>20-35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Software:</span>
                    <span>70-90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Food Service:</span>
                    <span>60-70%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
            <CardHeader>
              <CardTitle>Profit Analysis</CardTitle>
              <CardDescription>
                Your profit margin calculation and business insights.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {calculated ? (
                <>
                  <div className={`${getMarginBgColor()} p-6 rounded-lg text-center`}>
                    <div className="text-sm text-muted-foreground mb-2">Gross Profit Margin</div>
                    <div className={`text-4xl font-bold ${getMarginColor()}`}>
                      {grossProfitMargin.toFixed(1)}%
                    </div>
                    <div className="text-sm font-medium mt-2">
                      {getMarginAssessment()}
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                      <div className="text-xl font-semibold">
                        ${parseFloat(revenue).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Cost of Goods Sold</div>
                      <div className="text-xl font-semibold text-red-600">
                        ${parseFloat(cost).toLocaleString()}
                      </div>
                    </div>

                    <div className="bg-primary/10 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Gross Profit</div>
                      <div className={`text-xl font-semibold ${getMarginColor()}`}>
                        ${grossProfit.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Visual Breakdown */}
                  <div className="space-y-3">
                    <h3 className="font-semibold">Revenue Breakdown</h3>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Profit</span>
                        <span>{grossProfitMargin.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.max(0, grossProfitMargin)} className="h-3" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Costs</span>
                        <span>{(100 - grossProfitMargin).toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(100, 100 - grossProfitMargin)} className="h-3" />
                    </div>
                  </div>

                  {/* Improvement Tips */}
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Improvement Strategies</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Negotiate better supplier rates</li>
                      <li>• Optimize operational efficiency</li>
                      <li>• Review pricing strategy</li>
                      <li>• Reduce waste and overhead</li>
                      <li>• Focus on higher-margin products</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter your revenue and costs to see profit analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* SEO Content */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Understanding Profit Margins</CardTitle>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <p>
                Profit margin is a key financial metric that shows what percentage of revenue 
                remains as profit after accounting for costs. It's essential for understanding 
                business profitability and making informed pricing decisions.
              </p>
              
              <h3 className="text-lg font-semibold mt-6 mb-3">Types of Profit Margins</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Gross Profit Margin:</strong> (Revenue - COGS) / Revenue × 100</li>
                <li><strong>Operating Profit Margin:</strong> Operating Income / Revenue × 100</li>
                <li><strong>Net Profit Margin:</strong> Net Income / Revenue × 100</li>
              </ul>

              <h3 className="text-lg font-semibold mt-6 mb-3">Why Profit Margins Matter</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Measure operational efficiency</li>
                <li>Compare performance with competitors</li>
                <li>Guide pricing strategies</li>
                <li>Attract investors and lenders</li>
                <li>Identify areas for cost reduction</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProfitMargin;
