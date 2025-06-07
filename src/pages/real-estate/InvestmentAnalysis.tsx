
import { useState } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const InvestmentAnalysis = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyExpenses, setMonthlyExpenses] = useState("");
  const [appreciationRate, setAppreciationRate] = useState("");
  const [holdingPeriod, setHoldingPeriod] = useState("");
  const [results, setResults] = useState<{
    monthlyCashFlow: number;
    annualCashFlow: number;
    cashOnCashReturn: number;
    totalReturn: number;
    futureValue: number;
    totalProfit: number;
  } | null>(null);
  const [calculated, setCalculated] = useState(false);

  const calculateInvestment = () => {
    if (!purchasePrice || !downPayment || !monthlyRent || !monthlyExpenses) return;

    const price = parseFloat(purchasePrice);
    const down = parseFloat(downPayment);
    const rent = parseFloat(monthlyRent);
    const expenses = parseFloat(monthlyExpenses);
    const appreciation = parseFloat(appreciationRate) || 3;
    const years = parseFloat(holdingPeriod) || 5;
    
    // Calculate monthly cash flow
    const monthlyCashFlow = rent - expenses;
    const annualCashFlow = monthlyCashFlow * 12;
    
    // Cash-on-cash return
    const cashOnCashReturn = (annualCashFlow / down) * 100;
    
    // Future value with appreciation
    const futureValue = price * Math.pow(1 + appreciation / 100, years);
    
    // Total cash flow over holding period
    const totalCashFlow = annualCashFlow * years;
    
    // Total profit (appreciation + cash flow - initial investment)
    const totalProfit = (futureValue - price) + totalCashFlow;
    
    // Total return on investment
    const totalReturn = (totalProfit / down) * 100;

    setResults({
      monthlyCashFlow,
      annualCashFlow,
      cashOnCashReturn,
      totalReturn,
      futureValue,
      totalProfit
    });
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-sm text-muted-foreground mb-6">
          <span>Home</span> / <span>Real Estate Calculators</span> / <span className="text-foreground">Investment Analysis Calculator</span>
        </div>

        <div className="text-center mb-8">
          <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Investment Analysis Calculator</h1>
          <p className="text-xl text-muted-foreground">
            Analyze real estate investment returns and cash flow
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary" />
                <CardTitle>Investment Details</CardTitle>
              </div>
              <CardDescription>
                Enter property and investment information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price ($)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="250000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="downPayment">Down Payment ($)</Label>
                <Input
                  id="downPayment"
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  placeholder="50000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyRent">Monthly Rent Income ($)</Label>
                <Input
                  id="monthlyRent"
                  type="number"
                  value={monthlyRent}
                  onChange={(e) => setMonthlyRent(e.target.value)}
                  placeholder="2000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                <Input
                  id="monthlyExpenses"
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(e.target.value)}
                  placeholder="1500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appreciationRate">Annual Appreciation Rate (%)</Label>
                <Input
                  id="appreciationRate"
                  type="number"
                  value={appreciationRate}
                  onChange={(e) => setAppreciationRate(e.target.value)}
                  placeholder="3"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="holdingPeriod">Holding Period (years)</Label>
                <Input
                  id="holdingPeriod"
                  type="number"
                  value={holdingPeriod}
                  onChange={(e) => setHoldingPeriod(e.target.value)}
                  placeholder="5"
                />
              </div>

              <Button onClick={calculateInvestment} className="w-full" disabled={!purchasePrice || !downPayment || !monthlyRent || !monthlyExpenses}>
                Analyze Investment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Investment Analysis</CardTitle>
              <CardDescription>Your investment performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              {calculated && results ? (
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground mb-2">Monthly Cash Flow</div>
                    <div className="text-3xl font-bold text-primary">
                      ${results.monthlyCashFlow.toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Cash-on-Cash Return</div>
                      <div className="font-semibold text-lg">{results.cashOnCashReturn.toFixed(1)}%</div>
                    </div>
                    <div className="bg-muted p-4 rounded">
                      <div className="text-xs text-muted-foreground">Total Return</div>
                      <div className="font-semibold text-lg">{results.totalReturn.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-card border rounded">
                      <span className="text-sm">Annual Cash Flow</span>
                      <span className="font-semibold">${results.annualCashFlow.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card border rounded">
                      <span className="text-sm">Future Property Value</span>
                      <span className="font-semibold">${results.futureValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-card border rounded">
                      <span className="text-sm">Total Profit</span>
                      <span className="font-semibold text-green-600">${results.totalProfit.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="bg-card border p-4 rounded">
                    <h4 className="font-semibold mb-2">Investment Guidelines</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Good Cash-on-Cash:</span> <span>&gt; 8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Positive Cash Flow:</span> <span className={results.monthlyCashFlow > 0 ? "text-green-600" : "text-red-600"}>
                          {results.monthlyCashFlow > 0 ? "✓ Yes" : "✗ No"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter investment details to analyze returns</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InvestmentAnalysis;
